from fastapi import FastAPI, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
import numpy as np # type: ignore
import pickle
import joblib
import uvicorn

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
    postpartum_model = joblib.load(postpartum_model_path)
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
class PostpartumInput(BaseModel):
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
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")
    
# Postpartum Route
@app.post("/postpartum/predict")
def postpartum_predict(data: PostpartumInput):
    input_data = np.array([[data.q1, data.q2, data.q3, data.q4,
                            data.q5, data.q6, data.q7, data.q8,
                            data.q9, data.q10]])
    try:
        prediction = postpartum_model.predict(input_data)
        return {"prediction": prediction[0]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")

    
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
        total = sum(input_data[0])
        
        return {"prediction_text": f"Predicted Depression Level: {predicted_level}", 
        "total": total}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")
    

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)