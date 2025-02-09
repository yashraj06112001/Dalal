import { useForm } from "react-hook-form";
import React from "react";
import "@src/components/login/style.css";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const Login = () => {
  type formLogin = {
    customerId: string;
    password: string;
  };
  const {
    register: loginRegister,
    handleSubmit: loginController,
    watch: loginWatch,
    formState: { errors: loginError },
  } = useForm<formLogin>();

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

  const onSubmit = (data: formLogin) => {
    const currentDateTime = new Date().toISOString();
    console.log(data);
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON data type
      },
      body: JSON.stringify({
        customerId: data.customerId,
        password: data.password,
        dateAndTime: currentDateTime,
      }),
    })
      .then((response) => {
        if (response?.status === 201) {
          console.log("Hi your login has been done");
          openNotification(
            "success",
            "voila Login",
            "You have finally Login Inside the profile"
          );

          return response.json();
        } else if (response?.status === 401) {
          openNotification("error", "OOPs", "You have put wrong password");
          return response.json();
        } else if (response?.status === 404) {
          openNotification(
            "error",
            "OOPs",
            "No user of such customer Id found"
          );
          return response.json();
        } else {
          openNotification("error", "OOPs", "Login Failed");
          return response.json();
        }
      })
      .then((response) => {
        console.log("Login successful:", response);

        // Store the token securely
        localStorage.setItem("authToken", response.jwtToken);
        window.location.href = "/cardForm";
      })

      .catch((error) => {
        console.error("error in onSubmit:", error);
      });
  };
  return (
    <>
      <div className="login-container">
        <form
          onSubmit={loginController(onSubmit)}
          className="login-form"
          style={{ backgroundColor: "black", width: "400px" }}
        >
          <h2 style={{ color: "white" }}>Login</h2>

          <div className="form-group">
            <label htmlFor="customerId">Customer ID</label>
            <input
              id="customerId"
              {...loginRegister("customerId", {
                required: "Customer ID is required",
              })}
              placeholder="Enter your Customer ID"
              className={loginError.customerId ? "error" : ""}
              style={{ color: "black" }}
            />
            {loginError.customerId && (
              <p className="error-message">{loginError.customerId.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...loginRegister("password", {
                required: "Password is required",
              })}
              placeholder="Enter your password"
              className={loginError.password ? "error" : ""}
              style={{ color: "black" }}
            />
            {loginError.password && (
              <p className="error-message">{loginError.password.message}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
