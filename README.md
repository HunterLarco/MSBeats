# Run the server

1. Install [PyCrypto](https://www.dlitz.net/software/pycrypto/) globally with `pip`: `$ pip install pycrypto`

2. Run `$ dev_appserver.py app.yaml` inside of the server directory

# Populate Server

1. Open up [http://localhost:8000/console](http://localhost:8000/console) in your browser if your server is running

2. Execute the following code

```
from lib import scripts
scripts.populateDB()
```