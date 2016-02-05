from models.User import *


class AuthorizationFailed(Exception):
  pass


def RequireAuth(newfield, header='Authorization'):
  def decorator(funct):
    def helper(self, *args, **kwargs):
      if not header in self.request.headers:
        raise AuthorizationFailed()
      logintoken = self.request.headers[header]
      try:
        user = User.getByLoginId(logintoken)
      except Exception:
        raise AuthorizationFailed()
      if not user:
        raise AuthorizationFailed()
      kwargs[newfield] = user
      return funct(self, *args, **kwargs)
    return helper
  return decorator