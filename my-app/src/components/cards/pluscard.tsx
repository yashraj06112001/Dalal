import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CardForm from "./form";
import { useState } from "react";

const ClickableCard = () => {
  const handlePlusClick = () => {};
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <Card
        hoverable
        style={{
          width: 200,
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px dashed #d9d9d9",
          borderRadius: "8px",
        }}
        onClick={handlePlusClick} // Action on clicking the card
      >
        <PlusOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
      </Card>
    </div>
  );
};
export default ClickableCard;
