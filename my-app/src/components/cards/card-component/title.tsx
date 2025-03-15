import React from "react";

type titleProps = {
  dashboardName: string;
};
const title: React.FC<titleProps> = ({ dashboardName }) => {
  return (
    <>
      <div className="bg-gray-900 text-gray-400 font-extrabold text-4xl uppercase text-center py-4">
        {dashboardName}
      </div>
    </>
  );
};
export default title;
