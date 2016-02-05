import datetime

def toTimestamp(dt):
  return (dt - datetime.datetime(1970, 1, 1)).total_seconds()