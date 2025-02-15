import React from "react";

const DemoCard = ({ platform, icon, content }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-800 hover:border-gray-700 transition-all duration-200">
      <div className="flex items-center mb-4 text-gray-300">
        {icon}
        <span className="ml-2 font-semibold text-gray-300">{platform}</span>
      </div>
      <p className="text-gray-300">{content}</p>
    </div>
  );
};

export default DemoCard;
