class UnpackedModelFailedException(Exception):
  pass


def UnpackModelByID(model, field, newfield):
  def decorator(funct):
    def helper(self, *args, **kwargs):
      if not 'json' in kwargs or not field in kwargs['json']:
        raise UnpackedModelFailedException()
      modelid = kwargs['json'][field]
      try:
        entity = model.get_by_id(int(modelid))
      except Exception:
        raise UnpackedModelFailedException()
      if not entity:
        raise UnpackedModelFailedException()
      kwargs[newfield] = entity
      del kwargs['json'][field]
      return funct(self, *args, **kwargs)
    return helper
  return decorator
