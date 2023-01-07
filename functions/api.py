from .train import tf_train_model
from werkzeug.utils import secure_filename
import os,cv2
from flask import  request, jsonify,Response
from .predict import run_inference
from __main__ import app



@app.route("/upload", methods=["POST"])
def upload():
    for  pname in request.form.getlist("process_name[]"):
        spath = 'dataset/'+pname
        if not os.path.exists(spath):
            os.makedirs(spath)
            for file in request.files.getlist(pname+"[]"):
                file.save(os.path.join(spath, secure_filename(file.filename)))
        else:
            return jsonify({'res':'process already exist'})
        
        tf_train_model(10,'models','dataset',)

    return jsonify({'res':'success'})

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

def gen_frames(): 
    camera = cv2.VideoCapture('videos/furnace7_demo3.mp4')
    while True:
        success, frame = camera.read()  
        # infer_frames(frame)
        if success:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n') 
        else:
            break

# find = run_inference('C:/spritle/flask_classification/models')

# def infer_frames(img):
   
#     predit = find.load_image(img)


@app.route("/video_upload", methods=["POST"])
def get_video():
    video =  request.files.get('videoupload')
    filename =video.filename
    video.save(os.path.join('videos', secure_filename(filename)))
    cap = cv2.VideoCapture('videos/'+filename)
    folder = 'static/images/'+filename
    fps = 50
    imgpath = []
    if not os.path.exists(folder):
        os.makedirs(folder)
    count = 0
    img = 1
    while cap.isOpened():
        ret, frame = cap.read()
        if ret == True:   
            if count%fps == 0 :
                imgname = folder+'/'+str(img)+'.png'
                imgpath.append(imgname)
                cv2.imwrite(imgname,cv2.resize(frame,(800,500)))
                img+= 1
            count += 1
        else:
            break

    cap.release()
    cv2.destroyAllWindows()

    return jsonify({'res':'success','file':imgpath})


@app.route("/crops", methods=["POST"])
def crop():
    img = cv2.imread("static/images/2.mp4/1.png")
    img = cv2.resize(img , (800, 500))
    point =  request.form.get('point')
    for p in eval(point):
        x1= int(p['x'])
        y1 =int(p['y'])
        x2 = int(p['x'])+int(p['w'])
        y2 = int(p['y'])+int(p['h'])
        crop_img = img[y1:y2, x1:x2]
        cv2.imshow("cropped", crop_img)
        cv2.waitKey(0)	
    	
    return jsonify({'res':'success'})   