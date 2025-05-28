import os
import joblib
import numpy as np
import cv2
import mtcnn
import warnings
import tensorflow as tf
from tensorflow.keras.models import load_model
from sklearn.svm import SVC
warnings.filterwarnings("ignore")
ASSETS_DIR = os.path.join(os.path.dirname(__file__), '..', 'assets')

class FacialRecognitionModel:
    def __init__(self):
        self.model = self.load_recognition_model()
        self.pipeline, self.le = self.load_pipeline()
        self.original_image = None
        self.face_detector = mtcnn.MTCNN()

    def predict(self, image_bytes):
        img = self.preprocess_image(image_bytes)
        embedding_vector = self.model.predict(img)
        prediction_result = self.pipeline.predict_proba(embedding_vector)
        probabilities = [x * 100 for x in prediction_result[0]]
        predicted_class_idx = np.argmax(np.array(probabilities))
        predicted_class_name = self.le.inverse_transform([predicted_class_idx])[0]
        class_names = [class_name[5:] for class_name in self.le.inverse_transform(np.arange(len(probabilities)))]

        class_probabilities = dict(zip(class_names, probabilities))
        return predicted_class_name, class_probabilities

    def _crop_face_np(self, img_np):
        results = self.face_detector.detect_faces(img_np)
        if results:
            x, y, w, h = results[0]['box']
            x, y = max(0, x), max(0, y)
            return img_np[y:y+h, x:x+w]
        else:
            return img_np

    def crop_face_tf(self, img):
        face = tf.py_function(
            func=self._crop_face_np,
            inp=[img],
            Tout=tf.uint8
        )
        face.set_shape([None, None, 3])
        return face
    def preprocess_image(self, image_bytes, crop_face=True):
        img = tf.image.decode_image(image_bytes, channels=3, expand_animations=False)
        img = tf.cast(img, tf.uint8)

        if crop_face:
            img = self.crop_face_tf(img)

        img = tf.image.resize(img, [224, 224])
        img = tf.cast(img, tf.float32) / 255.0
        return tf.expand_dims(img, axis=0)
        
    def load_recognition_model(self):
        return load_model(os.path.join(ASSETS_DIR, 'embedding_model.keras'))
    def load_pipeline(self):
        loaded = joblib.load(os.path.join(ASSETS_DIR, 'face_rec.pkl'))
        return loaded['pipeline'], loaded['le']

if __name__ == "__main__":
    frm = FacialRecognitionModel()


