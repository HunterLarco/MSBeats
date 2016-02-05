from google.appengine.ext.webapp import template
import webapp2
import os

def AccessControlAllowOrigin(origin='*'):
  def decorator(funct):
    def helper(self, *args, **kwargs):
      self.response.headers['Access-Control-Allow-Origin'] = origin
      self.response.headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      self.response.headers['Access-Control-Request-Method'] = '*'
      self.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      return funct(self, *args, **kwargs)
    return helper
  return decorator

class RequestHandler(webapp2.RequestHandler):

  @AccessControlAllowOrigin()
  def get(self, *args, **kwargs):
    return super(RequestHandler, self).get(*args, **kwargs)

  @AccessControlAllowOrigin()
  def post(self, *args, **kwargs):
    return super(RequestHandler, self).post(*args, **kwargs)

  @AccessControlAllowOrigin()
  def put(self, *args, **kwargs):
    return super(RequestHandler, self).put(*args, **kwargs)

  @AccessControlAllowOrigin()
  def delete(self, *args, **kwargs):
    return super(RequestHandler, self).delete(*args, **kwargs)

  @AccessControlAllowOrigin()
  def options(self, *args, **kwargs):
    return super(RequestHandler, self).options(*args, **kwargs)
