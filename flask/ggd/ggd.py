from flask import Flask, request, session 
from flask import render_template

# import random

app = Flask(__name__)

# the "root" route
@app.route("/")
def index():
  return "<h1>Hello World</h1>"