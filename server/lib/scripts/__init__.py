import random

from ..models.User import *
from ..models.Link import *


def populateDB(posts=100, minVotes=0, maxVotes=1000):
  for i in range(posts):
    post = createRandomPost()
    post.votes = random.randint(minVotes, maxVotes)
    post.put()

def createRandomPost():
  return Link.create(guid(100), guid(40), createRandomUser())

def createRandomUser():
  return User.create(guid(), guid(), guid())

def guid(length=10):
  return ''.join(random.choice('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') for i in range(length))