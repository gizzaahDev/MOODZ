from fastapi import APIRouter, HTTPException
from app.schemas.prediction_request import PredictionRequest
from app.models.EPDS.epds_model import model
import numpy as np

router = APIRouter()

@router.post("/predictEPDS")
async def predict(request: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded. Please check the server setup.")
    
    try:
        # Extract input features from the request
        input_features = [request.q1, request.q2, request.q3, request.q4, request.q5,
                          request.q6, request.q7, request.q8, request.q9, request.q10]
        features_array = [np.array(input_features)]

        # Predict the result
        prediction = model.predict(features_array)
        return {"prediction_text": f"Predicted EPDS Total Score: {prediction[0]}"}
    except Exception as e:
        # Log the error and return a JSON error response
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during prediction.")
