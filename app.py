from flask import Flask
from torch import from_numpy
app = Flask(__name__)

from functions import api,routers



if __name__ == '__main__':
    app.run(host ='127.0.0.1' ,debug=True)
