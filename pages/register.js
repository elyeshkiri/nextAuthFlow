import React, { useState } from "react";
import { useAppDispatch } from "../redux_toolkit/hooks";

import { useRouter } from "next/router";
import { signupUser } from "../features/auth/authSlice";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
export default function Register() {
  const [values, setValues] = useState(initialValues);
  const dispatch = useAppDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signupUser(values));
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered <a href="login">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
