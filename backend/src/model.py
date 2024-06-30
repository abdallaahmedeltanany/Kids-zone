from flask import Flask, request, jsonify
from keras.models import load_model
import numpy as np
import cv2
import base64
from PIL import Image
from io import BytesIO

app = Flask(__name__)

# Load the model
try:
    model = load_model('English_num_model.h5')
    model2 = load_model('Arabic_num_model.h5')
    model3 = load_model('English_letter_model.h5')
    model4 = load_model('Arabic_letter_model.h5')
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")

english_letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '#', '@', '&', '$', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
arabic_letters = [
    'ي', 'و', 'ھ', 'ن', 'م', 'ل', 'ك', 'ق', 'ف', 'غ', 'ع', 'ظ', 'ط', 'ض', 'ص', 'ش', 'س', 'ز', 'ر', 'ذ', 'د', 'خ', 'ح', 'ج', 'ث', 'ت', 'ب', 'أ'
]
numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100
]  

# check english numbers
@app.route("/checkEnglishNumbers", methods=["POST"])
def check_english_numbers():
    try:
        image_data = request.get_data()
        if image_data == b'':
            return jsonify({"error": "No image found in request"}), 400

        # Extracting the base64 encoded string
        image_data = image_data.split(b";base64,")[1]
        # Decoding base64 data
        nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            print("Failed to decode image")
            return jsonify({"error": "Failed to decode image"}), 400

        print(f"Image shape after decoding: {img.shape}")

        if len(img.shape) == 2 or img.shape[2] == 1:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)

        pil_image = Image.open(BytesIO(nparr))
        pil_image.show()

        resized_img = cv2.resize(img, (100, 100))
        normalized_img = cv2.normalize(resized_img, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_32F)
        reshaped_img = normalized_img.reshape(1, 100, 100, 3)

        print(f"Image shape after resizing and normalization: {reshaped_img.shape}")

        # Assuming you have defined `model` and `numbers` somewhere
        prediction = model.predict(reshaped_img)
        predicted_index = np.argmax(prediction)
        predicted_number = numbers[predicted_index]

        print("Predicted english number:", predicted_number)
        return jsonify({"predictedNumber": predicted_number}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error flask"}), 500
    

# check arabic numbers
@app.route("/checkArabicNumbers", methods=["POST"])
def check_arabic_numbers():
    try:
        image_data = request.get_data()
        if image_data == b'':
            return jsonify({"error": "No image found in request"}), 400

        # Extracting the base64 encoded string
        image_data = image_data.split(b";base64,")[1]
        # Decoding base64 data
        nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            print("Failed to decode image")
            return jsonify({"error": "Failed to decode image"}), 400

        print(f"Image shape after decoding: {img.shape}")

        if len(img.shape) == 2 or img.shape[2] == 1:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)

        decoded_file_path = "decoded_img.png"
        cv2.imwrite(decoded_file_path, img)

        pil_image = Image.open(BytesIO(nparr))
        pil_image.show()

        resized_img = cv2.resize(img, (100, 100))
        normalized_img = cv2.normalize(resized_img, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_32F)
        reshaped_img = normalized_img.reshape(1, 100, 100, 3)

        print(f"Image shape after resizing and normalization: {reshaped_img.shape}")

        # Assuming you have defined `model` and `numbers` somewhere
        prediction = model2.predict(reshaped_img)
        predicted_index = np.argmax(prediction)
        predicted_number = numbers[predicted_index]

        print("Predicted arabic number:", predicted_number)
        return jsonify({"predictedNumber": predicted_number}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error flask"}), 500


#  check english letters
@app.route("/checkEnglishLetters", methods=["POST"])
def check_english_letters():
    try:
        image_data = request.get_data()
        if image_data == b'':
            return jsonify({"error": "No image found in request"}), 400

        # Extracting the base64 encoded string
        image_data = image_data.split(b";base64,")[1]
        # Decoding base64 data
        nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            print("Failed to decode image")
            return jsonify({"error": "Failed to decode image"}), 400

        print(f"Image shape after decoding: {img.shape}")

        if len(img.shape) == 2 or img.shape[2] == 1:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)

        pil_image = Image.open(BytesIO(nparr))
        pil_image.show()

        resized_img = cv2.resize(img, (32, 32))
        normalized_img = cv2.normalize(resized_img, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_32F)
        reshaped_img = normalized_img.reshape(1, 32, 32, 3)

        print(f"Image shape after resizing and normalization: {reshaped_img.shape}")

        prediction = model3.predict(reshaped_img)
        predicted_index = np.argmax(prediction)
        predicted_letter= english_letters[predicted_index]

        print("Predicted english char:", predicted_letter)
        return jsonify({"predictedLetter": predicted_letter}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error flask"}), 500



# check arabic letters 
@app.route("/checkArabicLetters", methods=["POST"])
def check_arabic_letters():
    try:
        image_data = request.get_data()
        if image_data == b'':
            return jsonify({"error": "No image found in request"}), 400

        # Extracting the base64 encoded string
        image_data = image_data.split(b";base64,")[1]
        # Decoding base64 data
        nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            print("Failed to decode image")
            return jsonify({"error": "Failed to decode image"}), 400

        print(f"Image shape after decoding: {img.shape}")

        if len(img.shape) == 2 or img.shape[2] == 1:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)

        pil_image = Image.open(BytesIO(nparr))
        pil_image.show()

        resized_img = cv2.resize(img, (32, 32))
        normalized_img = cv2.normalize(resized_img, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_32F)
        reshaped_img = normalized_img.reshape(-1, 32, 32, 1)

        print(f"Image shape after resizing and normalization: {reshaped_img.shape}")

        prediction = model4.predict(reshaped_img)
        predicted_index = np.argmax(prediction)
        print(f"predicted index : {predicted_index}")
        predicted_letter= arabic_letters[predicted_index]

        print("Predicted letter:", predicted_letter)
        return jsonify({"predictedLetter": predicted_letter}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error flask"}), 500





# ---------------------------------------------------------------------------


#  test arabic numbers on postman :
@app.route("/checkSendArabicNumber", methods=["POST"])
def check_send_arabic_number():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image found in request"}), 400
 
        image_data = request.files['image'].read()
     
        nparr = np.fromstring(image_data, np.uint8)
      
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
        if len(img.shape) == 2 or img.shape[2] == 1:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)

        resized_img = cv2.resize(img, (100, 100) )
        normalized_img =cv2.normalize(resized_img, None, 0, 255, cv2.NORM_MINMAX, cv2.CV_32F)
        reshaped_img = normalized_img.reshape(1, 100, 100, 3) 

        # Predict using the TensorFlow model
        prediction = model2.predict(reshaped_img)
        predicted_index = np.argmax(prediction)
        predicted_number = numbers[predicted_index]

        # Log prediction
        print("Predicted number:", predicted_number)

        return jsonify({"predictedNumber": predicted_number}), 200

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error"}), 500


if __name__ == "__main__":
    app.run(debug=True)
