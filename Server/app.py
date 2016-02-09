from google.appengine.ext.webapp import template
import webapp2
import os

from lib.JsonHelpers import *
from lib.UserHelpers import *
from lib.ModelHelpers import *
from lib.AccessibilityHelpers import *
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


def rankLinkList(links, perpage=30, page=1, user=None):
  json = []
  for i, link in enumerate(links):
    dic = link.toDict(user=user)
    dic['rank'] = i+1 + perpage*(page-1)
    json.append(dic)
  return json


class RequestHandler(webapp2.RequestHandler):
  @AccessControlAllowOrigin()
  def options(self, *args, **kwargs):
    pass


class SignupHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @BodyParameters('email', 'password', 'username')
  def post(self, email=None, password=None, username=None):
    return User.create(email, password, username).toPrivateDict()


class LoginHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @BodyParameters('emailusername', 'password')
  def post(self, emailusername=None, password=None):
    return User.login(emailusername, password).toPrivateDict()


class PostLinksHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @RequireAuth('user')
  @BodyParameters('title', 'url')
  def post(self, title=None, url=None, user=None):
    return Link.create(title, url, user).toDict()


class VoteHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @RequireAuth('user')
  @UnpackModelByID(Link, 'linkid', 'link')
  @BodyParameters('upvoted')
  def post(self, link=None, user=None, upvoted=None):
    link.vote(user, upvoted)


class UserInfoHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @RequireAuth('user')
  @UnpackModelByID(User, 'userid', 'target')
  def post(self, target=None, user=None, json=None):
    return target.toPublicDict()


class MyLinksHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @RequireAuth('user')
  def get(self, page=1, user=None):
    return {
      'links': rankLinkList(Link.queryByUser(user, page=page), user=user, page=page)
    }


class TopLinksHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @RequireAuth('user')
  def get(self, page=1, user=None):
    page = int(page)
    return {
      'links': rankLinkList(Link.queryTop(page=page), user=user, page=page)
    }


class NewLinksHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @RequireAuth('user')
  def get(self, page=1, user=None):
    page = int(page)
    return {
      'links': rankLinkList(Link.queryNew(page=page), user=user, page=page)
    }


class TrendingLinksHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @RequireAuth('user')
  def get(self, page=1, user=None):
    page = int(page)
    return {
      'links': rankLinkList(TrendingCounter.queryTrending(page=page), user=user, page=page)
    }


class PostLinkCommentsHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @RequireAuth('user')
  @UnpackModelByID(Comment, 'commentid', 'root')
  @BodyParameters('text')
  def post(self, user=None, text=None, root=None):
    return root.comment(text, user).toDict(user=user)


class GetLinkCommentsHandler(RequestHandler):
  @AccessControlAllowOrigin()
  @JSONResponse
  @ErrorHandler(ERROR_MAP)
  @JSONRequest
  @RequireAuth('user')
  @UnpackModelByID(Link, 'linkid', 'link')
  def post(self, user=None, link=None, json=None):
    linkDict = link.toDict()
    linkDict['comments'] = link.comments.get().toDict()['children']
    return linkDict


# This part here maps the routes to a RequestHandler
app = webapp2.WSGIApplication([
  ('/api/login/?', LoginHandler),
  ('/api/signup/?', SignupHandler),
  ('/api/links/?', PostLinksHandler),
  ('/api/links/mine/(\d+)', MyLinksHandler),
  ('/api/links/top/(\d+)', TopLinksHandler),
  ('/api/links/new/(\d+)', NewLinksHandler),
  ('/api/links/trending/(\d+)', TrendingLinksHandler),
  ('/api/links/vote/?', VoteHandler),
  ('/api/users/info/?', UserInfoHandler),
  ('/api/links/comments/?', PostLinkCommentsHandler),
  ('/api/links/comments/get/?', GetLinkCommentsHandler)
], debug=True)
