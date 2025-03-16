import React from "react";

interface RightSideBarProps {
  first: string;
  second: string;
}

const RightSideBar: React.FC<RightSideBarProps> = ({ first, second }) => {
  return (
    <>
      <div className="bg-gray-200 w-60 h-screen p-4 flex flex-col items-center space-y-4 shadow-md">
        <button className="w-full py-3 text-xl font-bold text-black bg-white rounded-lg shadow hover:bg-gray-300 transition">
          {first}
        </button>
        <button className="w-full py-3 text-xl font-bold text-black bg-white rounded-lg shadow hover:bg-gray-300 transition">
          {second}
        </button>
      </div>
    </>
  );
};

export default RightSideBar;
