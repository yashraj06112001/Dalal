import { useForm } from "react-hook-form";
import React from "react";
import "@src/components/login/style.css";

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
    console.log(data);
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
