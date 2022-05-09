import os
import io
import base64
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator, img_to_array
from tensorflow.keras.models import load_model
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
from data import disease_map, details_map

model = load_model('./Models/AgentCropKeras_v1.h5')

app = Flask(__name__)
cors = CORS(app)

def predict(file):
    pil_image = Image.open(io.BytesIO(file))
    my_image = img_to_array(pil_image)
    img = tf.keras.preprocessing.image.smart_resize(my_image, (256, 256))
    resize_image = tf.reshape(img, [1, 256, 256, 3])
    resize_image = resize_image / 255.0
    predict = model.predict(resize_image)
    index =(np.argmax(predict, axis = -1))[0]   # axis = -1 --> To compute the max element index within list of lists
    disc=disease_map[index]

    return jsonify({
        'prediction': disease_map[index],
        'description': details_map[disc][0],
        'symptoms': details_map[disc][1],
        'source': details_map[disc][2],
    })


#API dummy request
@app.route("/ping", methods=['GET'])
def ping():
    return jsonify("Hello, I am alive")


#API requests are handled here
@app.route('/net/image/prediction/', methods=['POST'])
def api_predict():
    bytesOfImage = request.get_data()
    diseases = predict(bytesOfImage)
    return diseases

@app.route('/dummy', methods=['POST'])
def api_dummy():
    bytesOfImage = request.get_data()
    images = [base64.encodebytes(bytesOfImage)]
    response = requests.post(
    "https://api.plant.id/v2/health_assessment",
    json={
        "images": images,
        "modifiers": ["similar_images"],
        "disease_details": ["description", "treatment"],
    },
    headers={
        "Content-Type": "application/json",
        "Api-Key": "fcSSv6px77jYfpi02EmXxJxpJzuUEzEXakU2YFK1Ff0319u171",
    }).json()
    print(response)
    return jsonify("hiii") 


if __name__ == "__main__":
    app.run(host='192.168.229.254', port=5500)
