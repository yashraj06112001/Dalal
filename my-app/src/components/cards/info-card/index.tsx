import Price from "./price";
import Description from "./description";
import Header from "./header";
import Image from "./image";
interface ProductCardProps {
  heading: string;
  color: string;
  describe: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  heading,
  color,
  describe,
  price,
}) => {
  return (
    <div
      className="max-w-lg mx-auto p-6 rounded-lg shadow-lg border border-gray-200"
      style={{
        backgroundColor: `${color}33`, // Adds transparency to make it duller (Hex with 20% opacity)
      }}
    >
      {/* Header Section */}
      <Header heading={heading} color={color} />

      {/* Description Section */}
      <div className="my-4">
        <Description describe={describe} />
      </div>
      <div className="my-4">
        <Image name={heading} />
      </div>
      {/* Price Section */}
      <div className="mt-4 flex justify-center">
        <Price price={price} />
      </div>
    </div>
  );
};

export default ProductCard;
