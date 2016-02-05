from google.appengine.ext.webapp import template
import webapp2
import os

from lib.classes.RequestHandler import *
from lib.JsonHelpers import *
from lib.UserHelpers import *
from lib.ModelHelpers import *
from lib.models.User import *
from lib.models.Link import *
from lib.blowfish import BadEncryptionException


ERROR_MAP = {
  InvalidJsonException           : ErrorTuple(000, 'Invalid json formatting'),
  MissingParameterException      : ErrorTuple(001, 'Parameter missing'),
  UnpackedModelFailedException   : ErrorTuple(002, 'Model unpacking failed'),
  AuthorizationFailed            : ErrorTuple(003, 'Authorization failed'),
  BadEncryptionException         : ErrorTuple(004, 'Bad Encryption Exception'),

  UserDoesntExistException       : ErrorTuple(100, 'User doesn\'t exist'),
  UserIncorrectPasswordException : ErrorTuple(101, 'Incorrect password'),
  UserEmailInUseException        : ErrorTuple(102, 'Email already in use'),
  UsernameInUseException         : ErrorTuple(103, 'Username already in use'),
  UserBadLoginIDException        : ErrorTuple(104, 'Bad user login ID')
}

class SignupHandler(webapp2.RequestHandler):
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @BodyParameters('email', 'password', 'username')
  def post(self, email=None, password=None, username=None):
    return User.create(email, password, username).toPrivateDict()


class LoginHandler(RequestHandler):
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @BodyParameters('emailusername', 'password')
  def post(self, emailusername=None, password=None):
    return User.login(emailusername, password).toPrivateDict()


class LinksHandler(webapp2.RequestHandler):
  @JSONResponse
  def options(self):
    return

  @JSONResponse
  @RequireAuth
  def get(self):
    return {
      'links': map(lambda x: x.toDict(), Link.queryTop())
    }

  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @RequireAuth
  @BodyParameters('title', 'url')
  def post(self, title=None, url=None, user=None):
    return Link.create(title, url, user).toDict()


class VoteHandler(webapp2.RequestHandler):
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @RequireAuth
  @UnpackModelByID(Link, 'linkid', 'link')
  @BodyParameters('upvoted')
  def post(self, link=None, user=None, upvoted=None):
    link.vote(user, upvoted)


class UserInfoHandler(webapp2.RequestHandler):
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @RequireAuth
  @UnpackModelByID(User, 'userid', 'target')
  def post(self, target=None, user=None, json=None):
    return target.toPublicDict()


# This part here maps the routes to a RequestHandler
app = webapp2.WSGIApplication([
  ('/api/login/?', LoginHandler),
  ('/api/signup/?', SignupHandler),
  ('/api/links/?', LinksHandler),
  ('/api/links/vote/?', VoteHandler),
  ('/api/users/info/?', UserInfoHandler)
], debug=True)
