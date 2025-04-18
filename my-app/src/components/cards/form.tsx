import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CardForm = () => {
  useEffect(() => {
    let token = localStorage.getItem("authToken");
    console.log("This is the token", token);

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://localhost:8000/api/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          // Changed from 201 to 200
          console.log("JWT verification failed");
          window.location.href = "/login";
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  //added new useEffect for getInfo
  interface cardType {
    name: string;
    color: string;
    price: string;
  }
  // getting data for comparing of the name with the already occured name
  const [totalData, setTotalData] = useState<cardType[]>([]);
  const [myMap, setMyMap] = useState(new Map());
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
        const data = response.data;
        console.log("yahan tak to puhucha", data);
        setTotalData(data);
      });
  }, []);

  useEffect(() => {
    const newMap = new Map();
    totalData.map((value) => {
      console.log("this is yash => ", value.name);
      newMap.set(value.name, 1);
    });
    setMyMap(newMap);
  }, [totalData]);
  // handling form Now
  type cardForm = {
    serialNumber: string;
    name: string;
    color: string;
    description: string;
    video: FileList;
    images: FileList;
    price: string;
  };
  //variables turned true after completion of image and video upload
  const [imageFileIsUploaded, setImageFileIsUploaded] = useState(false);
  const [videoFileIsUploaded, setVideoFileIsUploaded] = useState(false);
  const [infoFileIsUploaded, setInfoFileIsUploaded] = useState(false);

  useEffect(() => {
    if (imageFileIsUploaded && videoFileIsUploaded && infoFileIsUploaded) {
      window.location.href = "/dashboard";
    }
  }, [imageFileIsUploaded, videoFileIsUploaded, infoFileIsUploaded]);
  // creating form for the cards
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<cardForm>();
  // handling nameError
  let nameData = watch("name");
  const [nameError, setNameError] = useState(false);
  useEffect(() => {
    let ans = myMap.has(nameData);
    if (ans == true) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    console.log(nameData, nameError);
  }, [nameData]);

  const onSubmit = (data: cardForm) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("color", data.color);
    formData.append("description", data.description);
    formData.append("price", data.price);
    //formData.append("video", data.video[0]);

    // Append images one by one
    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });
    // NEW FORM DATA FOR VIDEO UPLOAD
    let formDataVideo = new FormData();
    formDataVideo.append("video", data.video[0]);
    formDataVideo.append("name", data.name);
    //NEW FORM DATA  FOR INFO
    const info = {
      name: data.name,
      color: data.color,
      description: data.description,
      price: data.price,
    };

    // Handle Image  form submission

    fetch("http://localhost:8000/api/image", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Images response is - ", response);
        if (response.success) {
          setImageFileIsUploaded(true);
        }
      });
    // HANDLE VIDEO UPLOAD
    fetch("http://localhost:8000/api/video", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: formDataVideo,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setVideoFileIsUploaded(true);
        }
      });
    // FOR REMAINING INFO THIS IS THE API
    fetch("http://localhost:8000/api/info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setInfoFileIsUploaded(true);
        }
      });
  };

  const removeImage = (index: number) => {
    const files = watch("images");
    if (files && files.length > 0) {
      const dataTransfer = new DataTransfer();
      Array.from(files)
        .filter((_, i) => i !== index) // Remove the selected image
        .forEach((file) => dataTransfer.items.add(file));

      setValue("images", dataTransfer.files); // Update the input field
    }
  };
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "black",
        width: "500px",
      }}
    >
      <h2 style={{ textAlign: "center", color: "white" }}>Create Deal</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* Property Name */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px", color: "white" }}
          >
            Property Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Property Name is required" })}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
          {nameError && (
            <span style={{ color: "red" }}>The Name already exists</span>
          )}
        </div>

        {/* Price */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="price"
            style={{ display: "block", marginBottom: "5px", color: "white" }}
          >
            Price
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              id="price"
              type="text"
              {...register("price", {
                required: "Price is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Enter a valid price (e.g., 100 or 100.50)",
                },
              })}
              style={{
                width: "calc(100% - 50px)",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: "black",
              }}
            />
            <span style={{ marginLeft: "10px", color: "white" }}>Lakhs</span>
          </div>
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>

        {/* Custom Color */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="color"
            style={{ display: "block", marginBottom: "5px", color: "white" }}
          >
            Custom Color
          </label>
          <input
            id="color"
            type="color"
            {...register("color", { required: "Custom Color is required" })}
            style={{
              width: "100%",
              height: "40px",
              padding: "0",
              border: "none",
              cursor: "pointer",
            }}
          />
          {errors.color && (
            <span style={{ color: "red" }}>{errors.color.message}</span>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="description"
            style={{ display: "block", marginBottom: "5px", color: "white" }}
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            style={{
              width: "100%",
              height: "320px",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.description && (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          )}
        </div>

        {/* Video Upload */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="video"
            style={{ display: "block", marginBottom: "5px", color: "white" }}
          >
            Upload Video
          </label>
          <input
            id="video"
            type="file"
            accept="video/*"
            {...register("video", { required: "Video upload is required" })}
            style={{ width: "100%", color: "red" }}
          />
          {errors.video && (
            <span style={{ color: "red" }}>{errors.video.message}</span>
          )}
        </div>

        {/* Images Upload */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="images"
            style={{ display: "block", marginBottom: "5px", color: "white" }}
          >
            Upload Images
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            {...register("images", { required: "Image upload is required" })}
            style={{ width: "100%", color: "red" }}
          />
          {errors.images && (
            <span style={{ color: "red" }}>{errors.images.message}</span>
          )}
          <div>
            {watch("images") &&
              Array.from(watch("images")).map((file: any, index: number) => (
                <>
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Image ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                        lineHeight: "1",
                      }}
                    >
                      &times;
                    </button>
                  </div>
                </>
              ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={nameError} // Disable button when nameError is true
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            opacity: nameError ? 0.6 : 1,
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CardForm;
