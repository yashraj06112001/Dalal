import React from "react";
interface description {
  describe: string;
}
const Description: React.FC<description> = ({ describe }) => {
  return (
    <>
      <p className="italic font-bold text-lg text-gray-800 border-l-4 border-black pl-4 font-serif">
        {describe}
      </p>
    </>
  );
};

export default Description;
