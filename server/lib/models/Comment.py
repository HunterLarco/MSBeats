from google.appengine.ext import ndb

class Comment(ndb.Model):
  text      = ndb.TextProperty     (indexed=False)
  userkey   = ndb.KeyProperty      (indexed=True )
  parentkey = ndb.KeyProperty      (indexed=True )
  created   = ndb.DateTimeProperty (indexed=True , auto_now_add=True)
  votes     = ndb.IntegerProperty  (indexed=True , default=0)
  children  = None
  
  def toDict(self, user=None):
    author = self.getUser()
    return {
      'text'      : self.text,
      'user'      : author.toPublicDict() if author else None,
      'created'   : str(self.created),
      'votes'     : self.votes,
      'children'  : map(lambda x: x.toDict(user=user), self.loadChildren()),
      'commentid' : self.key.id()
    }
  
  def getUser(self):
    return self.userkey.get() if self.userkey else None
  
  def loadChildren(self):
    if self.children == None:
      self.children = self.getThread(self)
    return self.children
  
  def comment(self, text, user):
    return self.create(text, self, user)
  
  @classmethod
  def getThread(cls, parent):
    children = cls.query(cls.parentkey == parent.key).order(-cls.votes)
    entities = []
    for child in children:
      child.children = cls.getThread(child)
      entities.append(child)
    return entities
  
  @classmethod
  def create(cls, text, parent, user):
    comment = cls()
    
    comment.text = text
    comment.parentkey = parent.key if parent else None
    comment.userkey = user.key if user else None
    
    print(comment)
    comment.put()
    return comment
