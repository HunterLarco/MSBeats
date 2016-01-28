from google.appengine.ext.webapp import template
import webapp2
import os


from JsonHelpers import *
from UserHelpers import *
from models.User import *
from models.Link import *


ERROR_MAP = {
  UserDoesntExistException       : ErrorTuple(100, 'User doesn\'t exist'),
  UserIncorrectPasswordException : ErrorTuple(101, 'Incorrect password'),
  UserEmailInUseException        : ErrorTuple(102, 'Email already in use'),
  UsernameInUseException         : ErrorTuple(103, 'Username already in use')
}


class SignupHandler(webapp2.RequestHandler):
  @JSONRequest
  @BodyParameters('email', 'password', 'username')
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  def post(self, email=None, password=None, username=None):
    return User.create(email, password, username).toDict()


class LoginHandler(webapp2.RequestHandler):
  @JSONRequest
  @BodyParameters('emailusername', 'password')
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  def post(self, emailusername=None, password=None):
    return User.login(emailusername, password).toDict()


class LinksHandler(webapp2.RequestHandler):
  @JSONResponse
  def get(self):
    return {
      'links': map(lambda x: x.toDict(), Link.queryTop())
    }
  
  @JSONRequest
  @RequireAuthByID(User, 'userid')
  @BodyParameters('title', 'artist', 'url')
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  def post(self, title=None, artist=None, url=None, user=None):
    return Link.create(title, artist, url, user).toDict()


class VoteHandler(webapp2.RequestHandler):
  @JSONRequest
  @RequireAuthByID(User, 'userid')
  @BodyParameters('linkid')
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  def post(self, linkid=None, user=None):
    pass


class MainHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'templates/main.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
  ('/api/login/?', LoginHandler),
  ('/api/signup/?', SignupHandler),
  ('/api/links/?', LinksHandler),
  ('/.*', MainHandler)
], debug=True)