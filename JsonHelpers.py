import json


def JSONRequest(funct):
  def helper(self, *args, **kwargs):
    body = self.request.body
    try:
      parsedBody = json.loads(body)
      kwargs['json'] = parsedBody
      return funct(self, *args, **kwargs)
    except ValueError:
      self.error(400)
  return helper


def BodyParameters(*params):
  def decorator(funct):
    def helper(*args, **kwargs):
      json = kwargs['json']
      del kwargs['json']
      for param in params:
        if not param in json:
          return self.error(406)
        kwargs[param] = json[param]
      return funct(*args, **kwargs)
    return helper
  return decorator


def JSONResponse(funct):
  def helper(self, *args, **kwargs):
    response = funct(self, *args, **kwargs)
    if response == None: response = {'success': True}
    if not 'success' in response: response['success'] = True
    flattened = json.dumps(response, indent=2)
    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(flattened)
  return helper
