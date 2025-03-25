import React, { useState } from "react";
import { Card, Modal, Typography } from "antd";
import ProductCard from "./info-card";
const { Title, Text } = Typography;

type cardType = {
  cardName: string;
  price: string;
  color: string;
  description: string;
};
const ClickableCard: React.FC<cardType> = ({
  cardName,
  price,
  color,
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePlusClick = () => {
    setIsModalOpen(true);
  };
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
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={800} // Increases width (default is 520px)
      >
        <ProductCard
          heading={cardName}
          price={price}
          color={color}
          describe={description}
        />
      </Modal>
    </div>
  );
};
export default ClickableCard;
