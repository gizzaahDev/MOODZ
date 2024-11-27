import pickle
import os

def load_model(file_name: str):
    try:
        model_path = os.path.join(os.getcwd(), file_name)
        with open(model_path, "rb") as model_file:
            model = pickle.load(model_file)
        return model
    except FileNotFoundError:
        print(f"Model file '{file_name}' not found. Please check if it exists.")
        return None
