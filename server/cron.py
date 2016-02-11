import webapp2
import logging
import datetime

from lib.models.Link import *


class UpdateTrendingHandler(webapp2.RequestHandler):
  def get(self):
    start = datetime.datetime.now()
    logging.info('Beginning Trending Counter update')
    TrendingCounter.updateTrendingCounters()
    now = datetime.datetime.now()
    diff = now - start
    seconds = diff.total_seconds()
    logging.info('Completed Trending Counter update - Elapsed time: %s seconds' % seconds)


app = webapp2.WSGIApplication([
  ('/cron/updatetrending/?', UpdateTrendingHandler)
], debug=True)
