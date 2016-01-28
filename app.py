from google.appengine.ext.webapp import template
import webapp2
import os


from JsonHelpers import *
from UserHelpers import *


class LoginHandler(webapp2.RequestHandler):
  @JSONRequest
  @BodyParameter('email', 'password', 'username')
  @JSONResponse
  def post(self):
    pass


class SignupHandler(webapp2.RequestHandler):
  @JSONRequest
  @BodyParameter('email', 'password')
  @JSONResponse
  def post(self):
    pass


class LinksHandler(webapp2.RequestHandler):
  @JSONResponse
  def get(self):
    pass
  
  @JSONRequest
  @RequireAuth
  @BodyParameter('title', 'artist', 'url')
  @JSONResponse
  def post(self):
    pass


class VoteHandler(webapp2.RequestHandler):
  @JSONRequest
  @BodyParameter('linkid')
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
  ('/.*', MainHandler)
], debug=True)