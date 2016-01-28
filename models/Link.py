from google.appengine.ext import ndb


class Link(ndb.Model):
  title   = ndb.StringProperty   (indexed=True, required=True)
  artist  = ndb.StringProperty   (indexed=True, required=True)
  url     = ndb.StringProperty   (indexed=True, required=True)
  userkey = ndb.KeyProperty      (indexed=True, required=True)
  created = ndb.DateTimeProperty (indexed=True, auto_now_add=True)
  votes   = ndb.IntegerProperty  (indexed=True, default=0)
  
  def toDict(self):
    return {
      'title'   : self.title,
      'artist'  : self.artist,
      'url'     : self.url,
      'user'    : self.getUser().toDict(),
      'created' : str(self.created),
      'votes'   : self.votes,
      'linkid'  : self.key.id()
    }
  
  def getUser(self):
    return self.userkey.get()
  
  @classmethod
  def queryTop(cls, count=30):
    return cls.query().order(-cls.votes).fetch(count)
  
  @classmethod
  def create(cls, title, artist, url, user):
    link = cls()
    
    link.title = title
    link.artist = artist
    link.url = url
    link.userkey = user.key
    
    link.put()
    return link
