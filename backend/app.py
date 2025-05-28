from flask import Flask
from flask_cors import CORS
from routes.predict import predict_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(predict_blueprint)

if __name__ == "__main__":
    app.run(debug=True)
