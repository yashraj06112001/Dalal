import React, { useState } from "react";
import { Card, Modal, Typography } from "antd";

const { Title, Text } = Typography;
const handlePlusClick = () => {};
type cardType = {
  cardName: string;
  price: string;
  color: string;
};
const ClickableCard: React.FC<cardType> = ({ cardName, price, color }) => {
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
          backgroundColor: color,
        }}
        onClick={handlePlusClick} // Action on clicking the card
      >
        <Title level={5} style={{ marginBottom: 8 }}>
          {cardName}
        </Title>
        <Text type="secondary" style={{ fontWeight: "bold", color: "#000" }}>
          {price}
        </Text>
      </Card>
    </div>
  );
};
export default ClickableCard;
