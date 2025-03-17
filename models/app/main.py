from fastapi import FastAPI, File, UploadFile, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
from fastapi.middleware.cors import CORSMiddleware
import numpy as np # type: ignore
from ultralytics import YOLO
from PIL import Image
import io
import pandas as pd
import pickle
import joblib
import uvicorn
import os

## Load the models
# Child Model
child_model_path = "childPredictor.pickle"

try:
    with open(child_model_path, "rb") as file:
        child_model = pickle.load(file)
except FileNotFoundError:
    raise Exception("Model file not found! Please enter the correct path.")

# Postpartum Model
postpartum_model_path = "EPDS_model.pkl"

try:
    model = joblib.load(postpartum_model_path)
except FileNotFoundError:
    raise Exception("Model file not found! Please enter the correct path.")
except Exception as e:
    raise Exception(f"Error loading model: {e}")

# Adult Model
adult_model_path = "depression_modelGDSRF.pkl"

try:
    with open(adult_model_path, "rb") as file:
        adult_model = pickle.load(file)
except FileNotFoundError:
    raise Exception("Model file not found! Please enter the correct path.")

# Married Model
married_model_path = "knn_model.pkl"

try:
    with open(married_model_path, "rb") as file:
        married_model = pickle.load(file)
except FileNotFoundError:
    raise Exception("Model file not found! Please enter the correct path.")

## Create FastAPI app
app = FastAPI()

## Input model for request body validation
# Child Inputs
class ChildInput(BaseModel):
    Q1: int
    Q2: int
    Q3: int
    Q4: int
    Q5: int
    Q6: int
    Q7: int
    Q8: int
    Q9: int
    Q10: int
    Q11: int
    Q12: int
    Q13: int
    Q14: int
    Q15: int
    Q16: int
    Q17: int
    Q18: int
    Q19: int
    Q20: int

# Postpartum Inputs
class EPDSInput(BaseModel):
    Q1: int
    Q2: int
    Q3: int
    Q4: int
    Q5: int
    Q6: int
    Q7: int
    Q8: int
    Q9: int
    Q10: int

# Adult Inputs
class AdultInput(BaseModel):
    Q1: int
    Q2: int
    Q3: int
    Q4: int
    Q5: int
    Q6: int
    Q7: int
    Q8: int
    Q9: int
    Q10: int
    Q11: int
    Q12: int
    Q13: int
    Q14: int
    Q15: int 

# Married Inputs
class MarriedInput(BaseModel):
    q1: float
    q2: float
    q3: float
    q4: float
    q5: float
    q6: float
    q7: float
    q8: float
    q9: float
    q10: float
    q11: float
    q12: float
    q13: float
    q14: float
    q15: float
    q16: float
    q17: float
    q18: float
    q19: float
    q20: float
    q21: float
    q22: float
    q23: float
    q24: float
    q25: float
    q26: float
    q27: float
    q28: float
    q29: float
    q30: float
    q31: float
    q32: float

## Routes
@app.get("/")
def read_root():
    return {"message": "Wellcome to MOODZ!"}

# Child Image Classifier
# Load models
face_detector = YOLO("Face_Detector.pt")
emotion_classifier = YOLO("Emotion_Classifier.pt")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/child/classify/")
async def classify_emotion(file: UploadFile = File(...)):
    try:
        # Read image
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        
        # Run face detection (Child/Non-child)
        face_results = face_detector(image)
        face_class_idx = face_results[0].probs.top1  # Get top prediction index
        face_class_name = face_results[0].names[face_class_idx]  # Get class name

        if face_class_name.lower() == "child":
            # Perform emotion classification
            emotion_results = emotion_classifier(image)
            emotion_class_idx = emotion_results[0].probs.top1  # Get top prediction index
            emotion_class_name = emotion_results[0].names[emotion_class_idx]  # Get class name
            
            return {"status": "success", "emotion": emotion_class_name}
        else:
            raise HTTPException(status_code=400, detail="Invalid input. Please upload an image containing a child's face.")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Child Route
@app.post("/child/predict")
def child_predict(data: ChildInput):
    input_data = np.array([[data.Q1, data.Q2, data.Q3, data.Q4,
                            data.Q5, data.Q6, data.Q7, data.Q8,
                            data.Q9, data.Q10, data.Q11, data.Q12,
                            data.Q13, data.Q14, data.Q15, data.Q16,
                            data.Q17, data.Q18, data.Q19, data.Q20]])
    try:
        prediction = child_model.predict(input_data)
        isDepressed = {0: "No", 1: "Yes"}
        result = isDepressed.get(prediction[0], "Unknown")

        return {"prediction": int(prediction[0]), "isDepressed": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction err: {e}")
    
    
# Postpartum Route
def reverse_scoring(data):
    try:
        data['Q3'] = 3 - data['Q3']
        data['Q5'] = 3 - data['Q5']
        data['Q10'] = 3 - data['Q10']
        return data
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing key in input data: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the data: {str(e)}")

# Categorize depression risk based on the total score
def categorize_epds(score):
    try:
        if score <= 9:
            return 'Low'
        elif 10 <= score <= 19:
            return 'Moderate'
        else:
            return 'High'
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error categorizing depression level: {str(e)}")
    

@app.post("/postpartum/predict")
async def predict(epds_input: EPDSInput):
    try:
        # Convert the input to a DataFrame
        input_data = pd.DataFrame([epds_input.dict()])

        # Apply reverse scoring
        input_data = reverse_scoring(input_data)

        # Calculate the total score
        input_data['Total_Score'] = input_data[['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10']].sum(axis=1)

        # Predict using the trained model
        prediction = model.predict(input_data[['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10']])

        # Categorize the result into 'Low', 'Moderate', or 'High'
        depression_level = categorize_epds(input_data['Total_Score'].iloc[0])

        return {"depression_level": depression_level}

    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input data format: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the prediction: {str(e)}")
    
    
# Adult Route
@app.post("/adult/predict")
def adult_predict(data: AdultInput):
    input_data = np.array([[data.Q1, data.Q2, data.Q3, data.Q4,
                            data.Q5, data.Q6, data.Q7, data.Q8,
                            data.Q9, data.Q10, data.Q11, data.Q12,
                            data.Q13, data.Q14, data.Q15]])
    try:
        prediction = adult_model.predict(input_data)[0]
        return {"predicted_depression_level": prediction}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")
    
    
# Married Route
@app.post("/married/predict")
def married_predict(data: MarriedInput):
    input_data = np.array([[data.q1, data.q2, data.q3, data.q4, data.q5,
            data.q6, data.q7, data.q8, data.q9, data.q10,
            data.q11, data.q12, data.q13, data.q14, data.q15,
            data.q16, data.q17, data.q18, data.q19, data.q20,
            data.q21, data.q22, data.q23, data.q24, data.q25,
            data.q26, data.q27, data.q28, data.q29, data.q30,
            data.q31, data.q32]
])
    try:
        prediction = married_model.predict(input_data)
        level_mapping = {0: "Low", 1: "Moderate", 2: "Severe"}
        predicted_level = level_mapping.get(prediction[0], "Unknown")
        total_score = sum(input_data[0])
        
        return {"prediction_text": f"Predicted Depression Level: {predicted_level}", 
        "total_score": total_score}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")
    
if __name__ == "__main__":
      
    uvicorn.run(app, host="0.0.0.0", port=8000)