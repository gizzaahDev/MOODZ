from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the pre-trained model
try:
    model = pickle.load(open("EPDSmodel.pkl", "rb"))
except FileNotFoundError:
    print("Model file not found. Please check if EPDSmodel.pkl exists in the directory.")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_features = [float(data[q]) for q in ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']]
        features_array = [np.array(input_features)]

        # Predict the result
        prediction = model.predict(features_array)
        return jsonify({'prediction_text': f'Predicted EPDS Total Score: {prediction[0]}'})
    except Exception as e:
        # Log the error and return a JSON error response
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred during prediction.'}), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')  # Make Flask accessible on the local network
