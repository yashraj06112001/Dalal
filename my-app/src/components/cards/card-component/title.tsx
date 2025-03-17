import React from "react";

type titleProps = {
  dashboardName: string;
};

const Title: React.FC<titleProps> = ({ dashboardName }) => {
  return (
    <div className="bg-gray-900 text-gray-400 font-extrabold text-4xl uppercase py-4 px-6 flex items-center justify-between">
      <span>{dashboardName}</span>
      <button className="bg-gray-700 text-white font-bold text-sm px-3 py-1 rounded-md shadow hover:bg-gray-600 transition">
        New Account
      </button>
    </div>
  );
};

export default Title;
