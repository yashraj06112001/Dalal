import React from "react";

interface RightSideBarProps {
  first: string;
  second: string;
}

const RightSIdeBar: React.FC<RightSideBarProps> = ({ first, second }) => {
  return (
    <>
      <div className="">
        <button>{first}</button>
        <button>{second}</button>
      </div>
    </>
  );
};
