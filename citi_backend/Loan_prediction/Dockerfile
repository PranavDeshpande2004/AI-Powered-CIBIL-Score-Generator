FROM jupyter/scipy-notebook

WORKDIR /home/jovyan/work

RUN pip install --no-cache-dir flask joblib numpy pandas scikit-learn xgboost flask_cors
# Copy the entire model directory to preserve its structure
COPY model/ model/

# Copy the Flask API script
COPY flask_api.py ./

# Install dependencies
RUN pip install flask joblib numpy pandas scikit-learn xgboost flask_cors

# Expose Flask port
EXPOSE 5000

# Start Flask API
CMD ["python", "flask_api.py"]