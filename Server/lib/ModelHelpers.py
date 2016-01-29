
def UnpackModelByID(model, field, newfield):
  def decorator(funct):
    def helper(self, *args, **kwargs):
      if not 'json' in kwargs or not field in kwargs['json']:
        return self.error(406)
      modelid = kwargs['json'][field]
      try:
        entity = model.get_by_id(int(modelid))
      except Exception:
        return self.error(406)
      if not entity:
        return self.error(406)
      kwargs[newfield] = entity
      del kwargs['json'][field]
      return funct(self, *args, **kwargs)
    return helper
  return decorator