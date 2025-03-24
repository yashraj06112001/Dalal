import React from "react";

interface header {
  heading: string;
  color: string;
}

const Header: React.FC<header> = ({ heading, color }) => {
  return (
    <>
      <div
        className={`w-full py-4 flex justify-center`}
        style={{ backgroundColor: color }}
      >
        <h1 className="text-3xl font-bold text-[#3d1f00] bg-white px-6 py-2 shadow-[5px_5px_0px_#3d1f00]">
          {heading}
        </h1>
      </div>
    </>
  );
};
export default Header;
