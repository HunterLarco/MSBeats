from google.appengine.ext import ndb


class InviteAlreadyUsed(Exception):
  pass


class Invite(ndb.Model):
  created = ndb.DateTimeProperty (indexed=True , auto_now_add=True)
  used    = ndb.BooleanProperty  (indexed=True, default=False)
  
  def use(self):
    if self.used: raise InviteAlreadyUsed()
    self.used = True
    self.put()
  
  @classmethod
  def create(cls):
    invite = cls()
    invite.put()
    return invite
  
  @classmethod
  def createBatch(cls, count=1):
    entities = []
    for _ in range(count):
      entities.append(cls())
    ndb.put_multi(entities)
    return entities