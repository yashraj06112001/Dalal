import { useEffect, useState } from "react";
import React from "react";

interface videoProps {
  name: string;
}
const Video: React.FC<videoProps> = ({ name }) => {
  interface data {
    video: string;
    name: string;
  }
  const [message, setMessage] = useState("");
  const [totalData, setTotalData] = useState<data[]>([]);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/get-video?name=${name}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          setMessage(response.message);
        } else {
          console.log("thr first get-video api - ", response);
          setTotalData(response.data);
        }
      });
  }, []);
  useEffect(() => {
    if (Array.isArray(totalData) && totalData.length === 1) {
      console.log("the total Data is - ", totalData);
      const url = totalData[0].video;
      const modifiedUrl = url.replace(/^video/, "");
      setVideoUrl(modifiedUrl);
    }
  }, [totalData]);
  useEffect(() => {
    console.log("the video URL is - ", videoUrl);
  }, [videoUrl]);
  return (
    <>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <h1 style={{ color: "black", marginBottom: "20px" }}>Video Gallery</h1>

        {videoUrl ? (
          <video width="600" controls>
            <source
              src={`http://localhost:8000/api/videoImport/${videoUrl}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </>
  );
};
export default Video;
