import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from imblearn.over_sampling import RandomOverSampler
import pickle

# Load and preprocess the dataset
data = pd.read_csv("epds_synthetic_dataset.csv")
data = data.drop(['Participant_ID', 'Age', 'Baby_Birth_Date'], axis=1)

x = data.drop('EPDS_Total_Score', axis=1)
y = data['EPDS_Total_Score']

# Apply oversampling to balance the target variable
ros = RandomOverSampler(random_state=42)
x_resampled, y_resampled = ros.fit_resample(x, y)

# Split the balanced data into training and testing sets
x_train, x_test, y_train, y_test = train_test_split(x_resampled, y_resampled, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=90, random_state=42)
model.fit(x_train, y_train)

# Make predictions
pred = model.predict(x_test)

# Evaluate accuracy
accuracy = accuracy_score(y_test, pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Save the model
pickle.dump(model, open("EPDSmodel.pkl", "wb"))
