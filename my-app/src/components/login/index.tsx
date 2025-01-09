import { useForm } from "react-hook-form";
import React from "react";
import "@src/components/login/style.css";
import { useNavigate } from "react-router-dom";

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
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(
          "login Not working",
          data?.status,
          "and the whole response is - ",
          data
        );
      })
      .catch((error) => {
        console.error("error in onSubmit:", error);
      });
  };
  return (
    <>
      <div className="login-container">
        <form onSubmit={loginController(onSubmit)} className="login-form">
          <h2>Login</h2>

          <div className="form-group">
            <label htmlFor="customerId">Customer ID</label>
            <input
              id="customerId"
              {...loginRegister("customerId", {
                required: "Customer ID is required",
              })}
              placeholder="Enter your Customer ID"
              className={loginError.customerId ? "error" : ""}
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
