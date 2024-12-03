from fastapi import FastAPI, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
import numpy as np # type: ignore
import pickle

# Load the model
model_path = "childPredictor.pickle"

try:
    with open(model_path, "rb") as file:
        model = pickle.load(file)
except FileNotFoundError:
    raise Exception("Model file not found! Please enter the correct path.")

# Create FastAPI app
app = FastAPI()

# Input model for request body validation
class InputData(BaseModel):
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

# Routes
@app.get("/")
def read_root():
    return {"message": "Nethma"}

@app.post("/child/predict")
def predict(data: InputData):
    input_data = np.array([[data.Q1, data.Q2, data.Q3, data.Q4,
                            data.Q5, data.Q6, data.Q7, data.Q8,
                            data.Q9, data.Q10, data.Q11, data.Q12,
                            data.Q13, data.Q14, data.Q15, data.Q16,
                            data.Q17, data.Q18, data.Q19, data.Q20]])
    try:
        prediction = model.predict(input_data)
        return {"prediction": int(prediction[0])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")