import numpy as np
from keras.models import model_from_json
import pickle,cv2,os


class run_inference(object):
    def __init__(self,path):
        self.path = path

        cls_f = open(self.path+"/out.pickle", "rb")
        self.classes = pickle.load(cls_f)
        cls_f.close()
        self.model= self.load_model()


    def load_model(self):
        json_file = open(self.path+'/model.json', 'r')
        loaded_model_json = json_file.read()
        json_file.close()
        loaded_model = model_from_json(loaded_model_json)
        loaded_model.load_weights(self.path+"/model.h5")
        return loaded_model

    def load_image(self,img):
        image=np.array(img)
        image = cv2.resize(image, (64, 64))
        image=np.array([image])
        image = image.astype('float32')
        image = image / 255.0
        prediction = self.model.predict(image)
        cls = self.classes[np.argmax(prediction)]
        
        return cls,np.max(prediction)




