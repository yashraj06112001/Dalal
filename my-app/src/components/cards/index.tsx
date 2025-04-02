import React, { useEffect } from "react";
import Title from "@src/components/cards/card-component/title";
import RightSideBar from "@src/components/cards/card-component/right-side-bar";
import ClickableCard from "@src/components/cards/pluscard";
import { useState } from "react";
import NewCard from "@src/components/cards/newcard";
const Dashboard = () => {
  interface cardType {
    name: string;
    color: string;
    price: string;
    description: string;
  }
  const [totalData, setTotalData] = useState<cardType[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/getInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let cardArray = response.data;
        console.log("the card Array is = ", cardArray);
        setTotalData(cardArray);
      });
  }, []);
  useEffect(() => {
    console.log("total data is - ", totalData);
  }, [totalData]);
  return (
    <div className="h-screen flex flex-col">
      {/* Title at the top */}
      <Title dashboardName="Dashboard" />
      <div className="flex flex-1">
        {/* Right Sidebar (Occupies full height on the right) */}
        <div className="w-60 h-full fixed right-0 top-17">
          <RightSideBar first="Dashboard" second="account" />
        </div>

        {/* Main content placeholder (Left side) */}
        <div className="flex-1 p-6">
          Main Content Here
          <ClickableCard />
          <br />
          {/* Conditionally Render Cards */}
          <div className="flex flex-wrap gap-4">
            {totalData.length > 0 ? (
              totalData.map((item) => (
                <NewCard
                  cardName={item.name}
                  price={item.price}
                  color={item.color}
                  description={item.description}
                />
              ))
            ) : (
              <p>No data available</p> // Show a message if no data is present
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
