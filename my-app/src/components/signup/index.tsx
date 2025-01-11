import React from "react";
import { useForm, useWatch } from "react-hook-form";

const SignUp = () => {
  type formSignUp = {
    agentId: string;
    agentName: String;
    phoneNumber: string;
    email: string;
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formSignUp>();
  const agentID = useWatch({
    control,
    name: "agentId",
  });
  const agentName = useWatch({
    control,
    name: "agentName",
  });
  const onSubmit = (data: formSignUp) => {
    console.log("Form Submitted Data:", data);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Agent ID */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="agentId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Agent ID
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
            }}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
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
