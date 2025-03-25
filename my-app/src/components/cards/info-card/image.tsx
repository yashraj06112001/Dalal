import { Col } from "antd";
import { Color } from "antd/es/color-picker";
import React, { useEffect, useState } from "react";

interface ImageProps {
  name: string; // Table name to fetch images
}

interface DataProps {
  serial_number: number;
  imageLocation: string; // Path of the image stored in the database
}

const Image: React.FC<ImageProps> = ({ name }) => {
  const [totalData, setData] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!name) return; // Prevent making API call if name is not provided
    fetch(`http://localhost:8000/api/get-image?name=${name}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setData(data.data); // Ensure correct state update
        }
      })
      .catch((error) => console.error("Error fetching images:", error))
      .finally(() => setLoading(false));
  }, [name]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-center mb-4">IMAGE GALLERY</h1>
      {loading ? (
        <>
          <h1>IMAGE GALARY</h1>
          <p className="text-center text-gray-500 text-lg">Loading images...</p>
        </>
      ) : totalData.length > 0 ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {totalData.map((item) => (
            <div
              key={item.serial_number}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md w-[200px] h-[200px] flex items-center justify-center"
            >
              <img
                src={`http://localhost:8000/api/imageImport/${item.imageLocation.replace(
                  /\\/g,
                  "/"
                )}`} // Use the backend endpoint
                alt={`Image ${item.serial_number}`}
                className="w-full h-full object-contain" // Ensures image fits inside 25x25 without cutting or overflowing
                loading="lazy" // Optional: for lazy loading
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No images available</p>
      )}
    </div>
  );
};

export default Image;
