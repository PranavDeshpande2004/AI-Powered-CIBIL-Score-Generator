import React, { ReactElement } from 'react';



const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description }</p>
    </div>
  );
};

export default FeatureCard;