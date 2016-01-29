from models.User import *


class AuthorizationFailed(Exception):
  pass


def RequireAuthByLoginID(field, newfield):
  def decorator(funct):
    def helper(self, *args, **kwargs):
      if not 'json' in kwargs or not field in kwargs['json']:
        raise AuthorizationFailed()
      logintoken = kwargs['json'][field]
      try:
        user = User.getByLoginId(logintoken)
      except Exception:
        raise AuthorizationFailed()
      if not user:
        raise AuthorizationFailed()
      kwargs[newfield] = user
      del kwargs['json'][field]
      return funct(self, *args, **kwargs)
    return helper
  return decorator