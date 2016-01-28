from google.appengine.ext.webapp import template
import webapp2
import os


from JsonHelpers import *
from UserHelpers import *
from models.User import *


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
    pass
  
  @JSONRequest
  @RequireAuth
  @BodyParameters('title', 'artist', 'url')
  @ErrorHandler(ERROR_MAP)
  @JSONResponse
  def post(self):
    pass


class VoteHandler(webapp2.RequestHandler):
  @JSONRequest
  @BodyParameters('linkid')
  @ErrorHandler(ERROR_MAP)
  @RequireAuth
  @JSONResponse
  def post(self):
    pass


class MainHandler(webapp2.RequestHandler):
  def get(self):
    template_values = {}
    path = os.path.join(os.path.dirname(__file__), 'templates/main.html')
    self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([
  ('/api/login/?', LoginHandler),
  ('/api/signup/?', SignupHandler),
  ('/.*', MainHandler)
], debug=True)