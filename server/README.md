# Flow of a request2

1. An HTTP request is send to the server

2. The routes are mapped with regular expressions in the `app.py` file at the bottom

3. The routes map to a `RequestHandler` implemented in `app.py`

4. The `RequestHandler` returns a JSON response back to the client

## HTTP methods

- GET
- POST: has a body
- PUT: has a body
- DELETE
- OPTIONS

An HTTP request consists out of:

- headers
- body
