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