import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { notification } from "antd";

interface SignUpProps {
  setIsDeactivated: (value: boolean) => void; // A function that takes a boolean and returns void
  setShowSignUp: (value: boolean) => void; // A function that takes a boolean and returns void
}

const SignUp: React.FC<SignUpProps> = ({ setIsDeactivated, setShowSignUp }) => {
  type formSignUp = {
    agentId: string;
    agentName: String;
    phoneNumber: string;
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSignUp>();

  const openNotification = (
    type: "success" | "error" | "info" | "warning",
    message: string,
    description: string
  ) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight", // You can set placement as 'topLeft', 'topRight', 'bottomLeft', or 'bottomRight'
    });
  };

  // here is our onSubmit function
  const onSubmit = (data: formSignUp) => {
    console.log(data);
    fetch("http://localhost:8000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON data type
      },
      body: JSON.stringify({
        agentName: data.agentName,
        agentId: data.agentId,
        phoneNumber: data.phoneNumber,
        agentEmail: data.email,
        password: data.password,
      }),
    }).then((response) => {
      console.log(response.json(), "the status is - ", response.status);
      if (response.status === 500) {
        openNotification(
          "error",
          "Not Signed Up",
          "There is some error may be you are already signed Up"
        );
      } else {
        openNotification("success", "signed Up", "you are now signed up");
      }
    });

    setIsDeactivated(false);
    setShowSignUp(false);
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
      <h2 style={{ textAlign: "center", color: "white" }}>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Agent ID */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="agentId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Agency Name
          </label>
          <input
            id="agentId"
            type="text"
            {...register("agentId", { required: "Agent ID is required" })}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.agentId && (
            <span style={{ color: "red" }}>{errors.agentId.message}</span>
          )}
        </div>

        {/* Agent Name */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="agentName"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Agent Name
          </label>
          <input
            id="agentName"
            type="text"
            {...register("agentName", { required: "Agent Name is required" })}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.agentName && (
            <span style={{ color: "red" }}>{errors.agentName.message}</span>
          )}
        </div>

        {/* Phone Number */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="phoneNumber"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.phoneNumber && (
            <span style={{ color: "red" }}>{errors.phoneNumber.message}</span>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              color: "black",
            }}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUp;
