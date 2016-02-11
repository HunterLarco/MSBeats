import random

from ..models.User import *
from ..models.Link import *
from ..models.Invite import *


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






from google.appengine.api import mail
from google.appengine.ext.webapp import template
import os

def emailSignup(emailList, sender="Make News <noreply.make.news@gmail.com>"):
  invites = Invite.createBatch(count=len(emailList))
  for i, email in enumerate(emailList):
    invite = invites[i]
    sendSignupEmail(email, invite, sender=sender)

def sendSignupEmail(email, invite, sender):
  message = mail.EmailMessage(sender=sender, subject="You've been invited to Make News!")
  message.to = email
  
  template_values = { 'signupLink': 'make-school-news.herokuapp.com/signup/{}'.format(invite.key.id()) }
  
  path = os.path.join(os.path.dirname(__file__), '../emails/invite.txt')
  message.body = template.render(path, template_values)
  
  path = os.path.join(os.path.dirname(__file__), '../emails/invite.html')
  message.html = template.render(path, template_values)
  
  message.send()
