import os,cv2,pickle
import numpy as np
from keras.utils import np_utils
from sklearn.model_selection import train_test_split

import matplotlib.pyplot as plt
from keras.layers import Dropout
from keras.layers import Flatten
from keras.constraints import maxnorm
from tensorflow.keras.optimizers import SGD

from keras.layers import Conv2D
from keras.layers.convolutional import MaxPooling2D
from keras.utils import np_utils
from keras import backend as K
from keras.models import Sequential
from keras.layers import Dense



class tf_train_model(object):
    def __init__(self,ep,save_path,data_path):
        
        self.epochs = ep
        imgs,index = self.img_to_numpy(save_path,data_path)
        imgs = self.pre_process(imgs)
        index,num_classes = self.one_hot_encode(index)
        self.X_train,self.X_test, self.y_train, self.y_test = train_test_split(imgs, index, test_size=0.20, random_state=7)
        self.model=self.define_model(num_classes,self.epochs)

        self.train_model(save_path)


    def pre_process(self,X):
        # normalize inputs from 0-255 to 0.0-1.0
        X=X.astype('float32')
        X = X / 255.0
        return X

    def one_hot_encode(self,y):
        # one hot encode outputs normalize lables
        y = np_utils.to_categorical(y)
        classes = y.shape[1]
        return y,classes


    def img_to_numpy(self,save_path,dataset):
        imgs=[]
        index=[]
        label = os.listdir(dataset)
        save_label = open(os.path.join(save_path, "out.pickle"),"wb")
        
        pickle.dump(label, save_label)
        save_label.close()

        for image_label in label:
            readpath = os.path.join(dataset, image_label)
            images = os.listdir(readpath)
            for image in images:
                img = cv2.imread(readpath+'/'+image)
                img = cv2.resize(img, (64, 64))
                imgs.append(img)
                index.append(label.index(image_label))
        imgs=np.array(imgs)
        index=np.array(index)

        return imgs,index

    def define_model(self,num_classes,epochs):
        # Create the model
        model = Sequential()
        model.add(Conv2D(32, (3, 3), input_shape=(64, 64, 3), padding='same', activation='relu', kernel_constraint=maxnorm(3)))
        model.add(Dropout(0.2))
        model.add(Conv2D(32, (3, 3), activation='relu', padding='same', kernel_constraint=maxnorm(3)))
        model.add(MaxPooling2D(pool_size=(2, 2)))
        model.add(Flatten())
        model.add(Dense(512, activation='relu', kernel_constraint=maxnorm(3)))
        model.add(Dropout(0.5))
        model.add(Dense(num_classes, activation='softmax'))

        # Compile model
        lrate = 0.01
        decay = lrate/epochs
        sgd = SGD(lr=lrate, momentum=0.9, decay=decay, nesterov=False)
        model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])
        return model
    
    def show_chart(self,history):
        # list all data in history
        print(history.history.keys())
        # summarize history for accuracy
        plt.plot(history.history['accuracy'])
        plt.plot(history.history['val_accuracy'])
        plt.title('model accuracy')
        plt.ylabel('accuracy')
        plt.xlabel('epoch')
        plt.legend(['train', 'test'], loc='upper left')
        plt.show()
        # summarize history for loss
        plt.plot(history.history['loss'])
        plt.plot(history.history['val_loss'])
        plt.title('model loss')
        plt.ylabel('loss')
        plt.xlabel('epoch')
        plt.legend(['train', 'test'], loc='upper left')
        plt.show()

    def train_model(self,save_path):
        self.history=self.model.fit(self.X_train,self.y_train, validation_data=(self.X_test, self.y_test), epochs=self.epochs, batch_size=32)
        scores = self.model.evaluate(self.X_test, self.y_test, verbose=0)
        
        # serialize model to JSONx
        model_json =self.model.to_json()
        with open(os.path.join(save_path,'model.json'), "w") as json_file:
            json_file.write(model_json)
        self.model.save_weights(os.path.join(save_path,'model.h5'))

        return round(scores[1]*100,2)

# val = tf_train_model(10,'models','dataset',)



