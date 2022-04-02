import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux_toolkit/hooks";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  loginUser,
  userSelector,
  clearState,
} from "../features/auth/authSlice";
import toast from "react-hot-toast";
const initialValues = {
  username: "",
  password: "",
};
const Login = ({}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(userSelector).isAuthenticated;
  const [values, setValues] = useState(initialValues);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && localStorage.getItem("token")) {
      router.push("/");
    }
  }, [isAuthenticated]);
  const { isSuccess, isError, errorMessage } = useSelector(userSelector);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      router.push("/");
    }
  }, [isError, isSuccess]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="username"
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleInputChange}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
          <p className="forgot-password text-right">
            Forgot <a>password?</a>
          </p>
          <p className="forgot-password text-right">
            {/* <a href="/register">Sign up</a> */}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
