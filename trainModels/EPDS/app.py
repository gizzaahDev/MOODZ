from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to restrict origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pre-trained model
try:
    model = joblib.load("EPDS_model.pkl")  # Load the trained model using joblib
except FileNotFoundError:
    print("Model file not found. Please check if EPDS_model.pkl exists in the directory.")
    model = None  # Initialize model as None if loading fails

# Define the request model
class PredictionRequest(BaseModel):
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

@app.post("/predict")
async def predict(request: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded. Please check the server setup.")
    
    try:
        # Extract input features from the request
        input_features = [request.q1, request.q2, request.q3, request.q4, request.q5,
                          request.q6, request.q7, request.q8, request.q9, request.q10]
        features_array = np.array(input_features).reshape(1, -1)  # Convert to 2D array (1, 10)

        # Predict the result
        prediction = model.predict(features_array)
        return {"prediction": prediction[0]}  # Return the predicted category/class

    except Exception as e:
        # Log the error and return a JSON error response
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during prediction.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
