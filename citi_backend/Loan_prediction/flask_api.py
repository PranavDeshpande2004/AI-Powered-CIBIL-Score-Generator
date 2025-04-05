from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import joblib
import pandas as pd

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# Load the model and selected features
model = joblib.load('model/credit_risk_model.pkl')
selected_features = joblib.load('model/selected_features.pkl')

@app.route("/")
def home():
    return jsonify({"message": "Backend is running on Render!"})

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the request
        data = request.json

        # Check if input data exists
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        # Convert input data to DataFrame
        input_df = pd.DataFrame([data])

        # Ensure all required features are present
        missing_features = [feat for feat in selected_features if feat not in input_df.columns]
        if missing_features:
            return jsonify({
                "error": f"Missing required features: {missing_features}"
            }), 400

        # Extract only the selected features
        X = input_df[selected_features]

        # Make prediction
        prediction_proba = model.predict_proba(X)[0, 1]  # Probability of default
        prediction = model.predict(X)[0]  # Binary prediction (0 or 1)

        # Determine risk category based on probability thresholds
        if prediction_proba < 0.3:
            risk_category = "Low_Risk"
        elif prediction_proba < 0.6:
            risk_category = "Medium_Risk"
        else:
            risk_category = "High_Risk"

        # Return the prediction
        return jsonify({
            "prediction": int(prediction),
            "default_probability": float(prediction_proba),
            "risk_category": risk_category,
            "message": "Default" if prediction == 1 else "No Default"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/model_info', methods=['GET'])
def model_info():
    try:
        # Return model information
        return jsonify({
            "model_type": type(model).__name__,
            "selected_features": selected_features,
            "required_input_format": {feature: "numeric_value" for feature in selected_features}
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
