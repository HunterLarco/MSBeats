import json
from collections import namedtuple


class InvalidJsonException(Exception):
  pass

class MissingParameterException(Exception):
  pass


def JSONRequest(funct):
  def helper(self, *args, **kwargs):
    body = self.request.body
    try:
      parsedBody = json.loads(body)
      kwargs['json'] = parsedBody
      return funct(self, *args, **kwargs)
    except ValueError:
      raise InvalidJsonException()
  return helper


def BodyParameters(*params):
  def decorator(funct):
    def helper(self, *args, **kwargs):
      json = kwargs['json']
      del kwargs['json']
      for param in params:
        if not param in json:
          raise MissingParameterException()
        kwargs[param] = json[param]
      return funct(self, *args, **kwargs)
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


ErrorTuple = namedtuple('ErrorTuple', 'code message')
def ErrorHandler(error_map):
  def decorator(funct):
    def helper(*args, **kwargs):
      try:
        return funct(*args, **kwargs)
      except Exception as error:
        import logging
        logging.error(error)
        
        errorClass = error.__class__
        if errorClass in error_map:
          return {
            'success': False,
            'code': error_map[errorClass].code,
            'message': error_map[errorClass].message
          }
        else:
          return {
            'success': False,
            'code': '-1',
            'message': 'Unknown error'
          }
    return helper
  return decorator
