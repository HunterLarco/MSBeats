from google.appengine.ext import ndb


def sha256(string):
  from hashlib import sha256
  return sha256(string).hexdigest()


class UserDoesntExist(Exception):
  pass

class IncorrectPassword(Exception):
  pass

class EmailInUse(Exception):
  pass

class UsernameInUse(Exception):
  pass


class User(ndb.Model):
  email    = ndb.StringProperty  (indexed=True , required=True)
  password = ndb.StringProperty  (indexed=False, required=True)
  username = ndb.StringProperty  (indexed=True , required=True)
  created  = ndb.DateTimeProperty(indexed=True , auto_now_add=True)
  karma    = ndb.IntegerProperty (indexed=True , default=0)
  
  def toDict(self):
    return {
      'email'    : self.email,
      'username' : self.username,
      'created'  : str(self.created),
      'karma'    : self.karma
    }
  
  def setPassword(self, password, oldpassword=None):
    if oldpassword != None:
      if not self.verifyPassword(oldpassword):
        raise InvalidPasswordException()
    
    self.password = sha256(password)
    self.put()
  
  def verifyPassword(self, password):
    return self.password == sha256(password)
  
  @classmethod
  def hasByUsername(cls, username):
    return cls.query(cls.username == username).count() != 0
  
  @classmethod
  def getByUsername(cls, username):
    return cls.query(cls.username == username).get()
  
  @classmethod
  def hasByEmail(cls, email):
    return cls.query(cls.email == email).count() != 0
  
  @classmethod
  def getByEmail(cls, email):
    return cls.query(cls.email == email).get()
  
  @classmethod
  def login(cls, emailusername, password):
    user = cls.getByEmail(emailusername)
    if user == None:
      user = cls.getByUsername(emailusername)
      if user == None:
        raise UserDoesntExist()
    
    if not user.verifyPassword(password):
      raise IncorrectPassword()
    
    return True
  
  @classmethod
  def create(cls, email, password, username):
    if cls.hasByEmail(email): raise EmailInUse()
    if cls.hasByUsername(username): raise UsernameInUse()
    
    user = cls()
    
    user.email = email
    user.username = username
    user.setPassword(password)
    
    user.put()
    return user