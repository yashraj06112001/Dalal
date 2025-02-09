import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CardForm = () => {
  useEffect(() => {
    let token = localStorage.getItem("authToken");
    console.log("This is the token", token);
    if (!token) {
      window.location.href = "/login";
    }
    fetch("http://localhost:8000/api/verify", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status !== 201) {
        console.log("nhi chal rha hai JWT");
        window.location.href = "/login";
      }
    });
  }, []);

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

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<cardForm>();

  const onSubmit = (data: cardForm) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("color", data.color);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("video", data.video[0]);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images[]", data.images[i]);
    }
    // Handle form submission
    console.log("This is the card data that you just put up", data);
    fetch("http://localhost:8000/api/card", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      console.log(response);
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CardForm;
