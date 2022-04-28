import React from "react";
import LeftSlider from "../components/LeftSlider";
import Link from "next/link";
const sec = null;
const initialValues = {
  email: "",
};
export default function OTPVerification() {
  return (
    <div>
      <LeftSlider></LeftSlider>
      <form className="d-flex flex-column justify-content-center">
        <div className="form-group">
          <img
            className="mb-4"
            src="/assets/logo/logo.png"
            style={{
              width: "72px",
              height: "72px",
              marginLeft: "calc((100% - 72px) / 2)",
            }}
          />
          <label className="font-bold title primary-color w-100 text-center">
            Enter the verificaton Code{" "}
          </label>
          <input
            type="text"
            className="input-form p-2 rounded bg-light-grey mt-3"
            id="verficationCode"
            name="verficationCode"
            aria-describedby="emailHelp"
            placeholder="Enter verfication Code"
          />
          {/* <div className="mt-2 red-color">
            <div>{"* Verification Code is required."}</div>
          </div> */}
        </div>
        <div className="resend primary-color">
          <p>{"Don't receive Code ? Get Code Again"}</p>
        </div>
        {/* <a className="resend primary-color">
          <p>
            {`Don't receive OTP?, Please wait ${{
              sec,
            }} Second for send code again..`}
          </p>
        </a> */}
        {/* <p>You have reached your limit...</p> */}
        <button
          type="submit"
          className="height-input bg-dark-primary font-medium rounded text-white text-uppercase w-100 border-0 mt-3"
        >
          Verify OTP
        </button>
      </form>
      {/* <app-loading></app-loading> */}
    </div>
  );
}
