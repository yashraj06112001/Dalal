import { useForm } from "react-hook-form";

const CardForm = () => {
  type cardForm = {
    serialNumber: string;
    name: string;
    color: string;
    description: string;
    video: FileList;
    images: FileList;
    price: string;
  };
  // creating form for the cards
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<cardForm>();

  const onSubmit = (data: cardForm) => {
    // Handle form submission
    console.log("This is the card data that you just put up", data);
    fetch("http://localhost:8000/api/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
    });
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
            style={{ display: "block", marginBottom: "5px" }}
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
            style={{ display: "block", marginBottom: "5px" }}
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
            style={{ display: "block", marginBottom: "5px" }}
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
            style={{ display: "block", marginBottom: "5px" }}
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
            style={{ display: "block", marginBottom: "5px" }}
          >
            Upload Video
          </label>
          <input
            id="video"
            type="file"
            accept="video/*"
            {...register("video", { required: "Video upload is required" })}
            style={{ width: "100%" }}
          />
          {errors.video && (
            <span style={{ color: "red" }}>{errors.video.message}</span>
          )}
        </div>

        {/* Images Upload */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="images"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Upload Images
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            {...register("images", { required: "Image upload is required" })}
            style={{ width: "100%" }}
          />
          {errors.images && (
            <span style={{ color: "red" }}>{errors.images.message}</span>
          )}
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
