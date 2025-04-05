import React, { useState } from "react";
import { BarChart3, Shield, Clock } from "lucide-react";
import FeatureCard from "./FeatureCard.jsx"; // Adjust the path as necessary

const initialFormData = {
  Annual_Income: "",
  Monthly_Inhand_Salary: "",
  Interest_Rate: "",
  Delay_from_due_date: "",
  Changed_Credit_Limit: "",
  Num_Credit_Inquiries: "",
  Outstanding_Debt: "",
  Credit_Utilization_Ratio: "",
  Credit_History_Age: "",
  Monthly_Balance: "",
};

function App() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data)
      setResult(data.risk_category);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || "",
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-6">
            AI-Powered CIBIL Score System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced credit risk assessment for macro-finance businesses, powered by artificial intelligence
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8 text-blue-500" />}
            title="Enhanced Accuracy"
            description="AI/ML-driven analysis of financial transactions and business growth"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-blue-500" />}
            title="Real-time Scoring"
            description="Instant credit assessment based on current financial behavior"
          />
          <FeatureCard
            icon={<Clock className="w-8 h-8 text-blue-500" />}
            title="Predictive Analytics"
            description="Advanced risk prediction models for loan default prevention"
          />
        </div>

        {/* Credit Score Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get Your Business Credit Score
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Annual_Income", label: "Annual Income ($)", placeholder: "e.g., 30000" },
              { name: "Monthly_Inhand_Salary", label: "Monthly Salary ($)", placeholder: "e.g., 2500" },
              { name: "Interest_Rate", label: "Interest Rate (%)", placeholder: "e.g., 12.5" },
              { name: "Delay_from_due_date", label: "Payment Delay (Days)", placeholder: "e.g., 10" },
              { name: "Changed_Credit_Limit", label: "Credit Limit Change ($)", placeholder: "e.g., -500" },
              { name: "Num_Credit_Inquiries", label: "Credit Inquiries", placeholder: "e.g., 6" },
              { name: "Outstanding_Debt", label: "Outstanding Debt ($)", placeholder: "e.g., 40000" },
              { name: "Credit_Utilization_Ratio", label: "Credit Utilization (%)", placeholder: "e.g., 80.2" },
              { name: "Credit_History_Age", label: "Credit History Age (Years)", placeholder: "e.g., 5" },
              { name: "Monthly_Balance", label: "Monthly Balance ($)", placeholder: "e.g., 500" },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
              >
                {loading ? "Calculating..." : "Get Credit Score"}
              </button>
            </div>
          </form>

          {/* Display result */}
          {result !== null && (
            <div className="mt-6 text-center text-lg font-semibold text-green-600">
              Predicted risk factor: {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
