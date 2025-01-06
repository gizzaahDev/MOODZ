# Use Python base image with version 3.10
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file from 'models'
COPY ./models/requirements.txt ./requirements.txt

# Upgrade pip
RUN python -m pip install --upgrade pip

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY ./models ./ 

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
