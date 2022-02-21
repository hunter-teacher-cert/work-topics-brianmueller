from flask import Flask, request, session 
from flask import render_template

# import random
import re

app = Flask(__name__)

# the "root" route
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/guess",methods=['POST'])
def guess():
    user_input = request.form['user_input'].lower()
    pattern = re.compile(r"(.)\1")
    if re.search(pattern, user_input):
        user_color = "green"
        user_can = "can"
    else:
        user_color = "red"
        user_can = "can't"
    
    return render_template("guess.html", user_input=user_input, user_color = user_color, user_can = user_can)