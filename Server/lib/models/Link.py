from google.appengine.ext import ndb
from google.appengine.ext.ndb import polymodel
import datetime

from Comment import Comment
from ..util import timeutil


class VoteCounter(polymodel.PolyModel):
  linkkey = ndb.KeyProperty      (indexed=True, required=True)
  userkey = ndb.KeyProperty      (indexed=True, required=True)
  created = ndb.DateTimeProperty (indexed=True, auto_now_add=True)
  
  @classmethod
  def countKarma(cls, user):
    return cls.query(cls.userkey == user.key).count()
  
  @classmethod
  def countVotes(cls, link):
    return cls.query(cls.linkkey == link.key).count()
  
  @classmethod
  def _formAncestor(cls, user, link):
    return ndb.Key('Link', link.key.urlsafe(), 'Liker', user.key.urlsafe())
  
  @classmethod
  def hasVoted(cls, user, link):
    return cls.query(ancestor=cls._formAncestor(user, link)).count() != 0
  
  @classmethod
  def get(cls, user, link):
    return cls.query(ancestor=cls._formAncestor(user, link)).get()
  
  @classmethod
  def delete(cls, user, link):
    counter = cls.get(user, link)
    if not counter: return False
    counter.key.delete()
    return True
  
  @classmethod
  def create(cls, user, link):
    counter = cls(parent=cls._formAncestor(user, link))
    
    counter.linkkey = link.key
    counter.userkey = user.key
    
    counter.put()
    return counter


class DownVoteCounter(VoteCounter):
  pass

class UpVoteCounter(VoteCounter):
  pass


class Link(ndb.Model):
  title    = ndb.StringProperty   (indexed=True, required=True)
  url      = ndb.StringProperty   (indexed=True, required=True)
  userkey  = ndb.KeyProperty      (indexed=True, required=True)
  created  = ndb.DateTimeProperty (indexed=True, auto_now_add=True)
  votes    = ndb.IntegerProperty  (indexed=True, default=0)
  comments = ndb.KeyProperty      (indexed=True, required=True)
  
  def toDict(self, user=None):
    return {
      'title'         : self.title,
      'url'           : self.url,
      'user'          : self.getUser().toPublicDict(),
      'created'       : timeutil.toTimestamp(self.created),
      'votes'         : self.votes,
      'linkid'        : self.key.id(),
      'voteStatus'    : self.getVotedStatus(user) if user else None,
      'commentrootid' : self.comments.id()
    }
  
  def getVotedStatus(self, user):
    if UpVoteCounter.hasVoted(user, self): return 1
    if DownVoteCounter.hasVoted(user, self): return -1
    return 0
  
  def countVotes(self):
    return UpVoteCounter.countVotes(self) - DownVoteCounter.countVotes(self)
  
  def vote(self, user, upvoted):
    author = self.getUser()
    oldkarma = UpVoteCounter.countKarma(author) - DownVoteCounter.countKarma(author)
    oldvotes = self.countVotes()
    
    if UpVoteCounter.hasVoted(user, self):
      if upvoted: return
      oldvotes -= 1
      oldkarma -= 1
      UpVoteCounter.delete(user, self)
    elif DownVoteCounter.hasVoted(user, self):
      if not upvoted: return
      oldvotes += 1
      oldkarma += 1
      DownVoteCounter.delete(user, self)
    
    author.karma = oldkarma
    author.karma += 1 if upvoted else -1
    author.put()
    
    self.votes = oldvotes
    self.votes += 1 if upvoted else -1
    self.put()
    
    if upvoted: UpVoteCounter.create(user, self)
    else: DownVoteCounter.create(user, self)
  
  def getComments(self):
    rootComment = self.comments.get()
    rootComment.loadChildren()
    return rootComment
  
  def getUser(self):
    return self.userkey.get()
  
  @classmethod
  def queryByUser(cls, user, count=30):
    return cls.query(cls.userkey == user.key).order(-cls.created).fetch(count)
  
  @classmethod
  def queryNew(cls, count=30):
    return cls.query().order(-cls.created).fetch(count)
  
  @classmethod
  def queryTop(cls, count=30):
    return cls.query().order(-cls.votes).fetch(count)
  
  @classmethod
  def create(cls, title, url, user):
    link = cls()
    
    link.title = title
    link.url = url
    link.userkey = user.key
    link.comments = Comment.create(None, None, None).key
    
    link.put()
    TrendingCounter.create(link)
    
    return link


class TrendingCounter(ndb.Model):
  link    = ndb.KeyProperty      (              required=True)
  score   = ndb.FloatProperty    (indexed=True, required=True, default=0)
  created = ndb.DateTimeProperty (indexed=True, auto_now_add=True)
  
  def getLink(self):
    return self.link.get()
  
  def getTrendingValue(self, now=None, save=True):
    if now == None: now = datetime.datetime.now()
    diff = now - self.created
    seconds = diff.total_seconds()
    hours = seconds / (60.0*60)
    score = self._hackerNewsAlgorithm(self.getLink().votes, hours)
    if save:
      self.score = score
      self.put()
    return score
  
  @staticmethod
  def _hackerNewsAlgorithm(votes, item_hour_age, gravity=1.8):
    # https://news.ycombinator.com/item?id=1781013
    return (votes - 1) / pow((item_hour_age+2), gravity)
  
  @classmethod
  def updateTrendingCounters(cls):
    now = datetime.datetime.now()
    entities = cls.query()
    for entity in entities:
      entity.score = entity.getTrendingValue(now=now, save=False)
    ndb.put_multi(entities)
  
  @classmethod
  def queryTrending(cls, count=30):
    return map(lambda x: x.getLink(), cls.query().order(-cls.score).fetch(count))
  
  @classmethod
  def create(cls, link):
    counter = cls()
    counter.link = link.key
    counter.score = cls._hackerNewsAlgorithm(link.votes, 0)
    counter.put()
    return counter
