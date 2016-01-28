
def RequireAuthByID(model, field):
  def decorator(funct):
    def helper(self, *args, **kwargs):
      if not 'json' in kwargs or not field in kwargs['json']:
        return self.error(406)
      userid = kwargs['json'][field]
      user = model.get_by_id(int(userid))
      if not user:
        return self.error(401)
      kwargs['user'] = user
      del kwargs['json'][field]
      return funct(self, *args, **kwargs)
    return helper
  return decorator