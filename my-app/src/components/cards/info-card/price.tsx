import React from "react";
interface PriceInterface {
  price: string;
}
const Price: React.FC<PriceInterface> = ({ price }) => {
  return (
    <>
      <div className="flex justify-center items-center">
        <span className="text-2xl font-extrabold text-white bg-[#3d1f00] px-6 py-3 rounded-md shadow-[5px_5px_0px_#a05a2c]">
          ₹{price} L
        </span>
      </div>
    </>
  );
};
export default Price;
