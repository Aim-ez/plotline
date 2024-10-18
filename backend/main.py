from flask import Flask, render_template
from config import app

@app.route('/')
def home():
    return render_template('home.html')