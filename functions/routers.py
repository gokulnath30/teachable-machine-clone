from flask import render_template,request
from __main__ import app



@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')


@app.route("/edit", methods=['GET'])
def edit():
    return render_template('edit.html')


@app.route("/video", methods=['GET'])
def video():
    return render_template('video.html')



@app.route("/new", methods=['GET'])
def new():
    return render_template('new.html')


@app.route("/stream", methods=['GET'])
def live():
    return render_template('stream.html')


@app.route("/live", methods=['GET'])
def edit_video():
   
    return render_template('live.html')



@app.route("/temp", methods=['GET'])
def temp():
    return render_template('temp.html')