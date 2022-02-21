from flask import Flask, request, session 
from flask import render_template

# import random
import re

app = Flask(__name__)
app.secret_key="my_session_secret"

# the "root" route
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/guess",methods=['POST'])
def guess():

    if 'num_can' not in session:
        session['num_can'] = 0
        session['num_cant'] = 0

    user_input = request.form['user_input'].lower()
    pattern = re.compile(r"(.)\1")
    if re.search(pattern, user_input):
        user_color = "green"
        user_can = "can"
        session['num_can'] = session['num_can'] + 1
    else:
        user_color = "red"
        user_can = "can't"
        session['num_cant'] = session['num_cant'] + 1
    
    return render_template("guess.html", user_input=user_input, user_color = user_color, user_can = user_can, num_can = session['num_can'], num_cant = session['num_cant'])