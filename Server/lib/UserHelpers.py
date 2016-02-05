from models.User import *


class AuthorizationFailed(Exception):
  pass

authHeader = 'Authorization'

def RequireAuth(funct):
  def helper(self, *args, **kwargs):
    if not authHeader in self.request.headers:
      raise AuthorizationFailed()
    logintoken = self.request.headers[authHeader]
    try:
      user = User.getByLoginId(logintoken)
    except Exception:
      raise AuthorizationFailed()
    if not user:
      raise AuthorizationFailed()
    return funct(self, *args, **kwargs)
  return helper
