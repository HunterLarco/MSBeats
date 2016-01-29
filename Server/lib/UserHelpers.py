from models.User import *


def RequireAuthByLoginID(field, newfield):
  def decorator(funct):
    def helper(self, *args, **kwargs):
      if not 'json' in kwargs or not field in kwargs['json']:
        return self.error(406)
      logintoken = kwargs['json'][field]
      try:
        user = User.getByLoginId(logintoken)
      except Exception:
        return self.error(401)
      if not user:
        return self.error(401)
      kwargs[newfield] = user
      del kwargs['json'][field]
      return funct(self, *args, **kwargs)
    return helper
  return decorator