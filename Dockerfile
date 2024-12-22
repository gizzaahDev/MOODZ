# Use Python base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file from 'models'
COPY ./models/requirements.txt ./

RUN python -m pip install --upgrade pip
# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY ./models ./

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
