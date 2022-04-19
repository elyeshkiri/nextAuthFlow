import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "../redux_toolkit/hooks";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  loginUser,
  userSelector,
  clearState,
} from "../features/auth/authSlice";
import toast from "react-hot-toast";
import LeftSlider from "../components/LeftSlider";

const initialValues = {
  username: "",
  password: "",
};
const Login = ({}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(userSelector).isAuthenticated;
  const [values, setValues] = useState(initialValues);
  const [isPasswordShown, setPasswordShown] = useState(false);
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
  const togglePasswordVisiblity = () => {
    setPasswordShown(!isPasswordShown);
  };
  return (
    <div className="form-holder">
      <div className="menu-holder">
        <ul className="main-links d-flex d-md-block flex-column-reverse">
          <li>
            <a className="normal-link">{"You don't have an account?"}</a>
          </li>
          <li>
            <a className="sign-button">Create account</a>
          </li>
        </ul>
      </div>
      <LeftSlider />
      <form className="form-sign d-flex flex-column justify-content-center mb-3 mb-sm-0">
        <img
          className="mb-4"
          style={{
            width: "72px",
            height: "72px",
            marginLeft: "calc((100% - 72px) / 2)",
          }}
          src="/assets/logo/logo.png"
          alt="logo"
        />

        <label className="font-medium primary-color mt-4">Email: </label>
        <div className="icon-input d-flex w-100  position-relative">
          <div className="option-icon position-absolute text-center">
            <i className="fas fa-user"></i>
          </div>

          <input
            type="email"
            className="input-form p-2 rounded bg-light-grey input-padding-left"
            style={{ paddingLeft: "40px" }}
            id="email"
            name="email"
            formControlName="email"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
        </div>

        {/* <div className="mt-2 red-color">* Email is required.</div> */}

        <label className="font-medium primary-color mt-3">Password: </label>
        <div className="icon-input d-flex w-100  position-relative">
          <div className="option-icon position-absolute text-center">
            <i className="fas fa-lock"></i>
          </div>
          <input
            type={isPasswordShown ? "text" : "password"}
            className="input-form p-2 rounded bg-light-grey input-padding-left"
            style={{ paddingLeft: "40px !important" }}
            id="password"
            name="password"
            formControlName="password"
            placeholder="Password"
          />
          <div
            className="option-icon position-absolute text-center"
            style={{ right: "0" }}
          >
            {isPasswordShown ? (
              <i
                className="fas fa-eye dark-grey-color"
                onClick={togglePasswordVisiblity}
              ></i>
            ) : (
              <i
                className="fas fa-eye-slash dark-grey-color"
                onClick={togglePasswordVisiblity}
              ></i>
            )}
          </div>
        </div>

        <div>
          {/* <div className="mt-2 red-color">* Password is required.</div> */}
        </div>
        <div
          className="mt-3 text-right cursor-pointer dark-grey-color"
          style={{ outline: "none", textDecoration: "underline" }}
        >
          <Link href="/forget"> Forget Password?</Link>
        </div>
        <button
          type="submit"
          className="height-input bg-dark-primary font-medium rounded text-white text-uppercase w-100 border-0 mt-3"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
