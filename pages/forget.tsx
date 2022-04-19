import React from "react";
import LeftSlider from "../components/LeftSlider";
import Link from "next/link";
const initialValues = {
  email: "",
};
export default function Forget() {
  return (
    <div>
      <div className="form-holder">
        <div className="menu-holder">
          <div
            className="d-flex align-items-center position-absolute rounded py-2 px-3 cursor-pointer font-medium home"
           
          >
            <i className="fas fa-arrow-left mr-2"></i>
            <span>Home</span>
          </div>
        </div>
      </div>
      <LeftSlider></LeftSlider>
      <div className="form-sign d-flex flex-column justify-content-center mb-3 mb-sm-0 pt-5" >
        <form style={{margin: 0}}>
          <img
            className="mb-4"
            src="assets/logo/logo.png"
            alt=""
            style={{
              width: "72px",
              height: "72px",
              marginLeft: "calc((100% - 72px) / 2)",
            }}
          />
          <div className="d-flex align-items-center bg-light-grey border rounded p-2 mt-3">
            <input
              style={{ background: "transparent", outline: "none" }}
              className="border-0 w-50"
              type="email"
              placeholder="Enter your email address"
           
            />
          </div>
          {/* <div>
            <div className="mt-2 red-color">*Please enter a valid Email.</div>
          </div> */}
          <button
            type="button"
            className="height-input bg-dark-primary font-medium rounded text-white text-uppercase w-100 border-0 mt-3"
          >
            Send OTP
          </button>
        </form>
      </div>
      {/* <app-forget-pwd-otp-verification></app-forget-pwd-otp-verification>
      <app-loading></app-loading> */}
    </div>
  );
}
