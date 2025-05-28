from flask import Blueprint, request, jsonify

from utils.utils import FacialRecognitionModel

predict_blueprint = Blueprint("predict", __name__)
facial_recognition_model = FacialRecognitionModel()

@predict_blueprint.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"Bad Request": "No Image Provided"}), 400

    file = request.files["image"]
    file = file.read()
    prediction, probabilities = facial_recognition_model.predict(file)
    return jsonify({"prediction": prediction[5:], "probabilities": probabilities }), 200
