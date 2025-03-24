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
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading images...</p>
      ) : totalData.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {totalData.map((item) => (
            <div
              key={item.serial_number}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
            >
              <img
                src={`http://localhost:8000/api/imageImport/${item.imageLocation.replace(
                  /\\/g,
                  "/"
                )}`} // Use the backend endpoint
                alt={`Image ${item.serial_number}`}
                className="w-full max-w-full max-h-full h-full" // Changed from h-40 object-cover
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
