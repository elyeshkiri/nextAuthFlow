import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../redux_toolkit/hooks";
import "react-phone-number-input/style.css";
import { country_codes } from "../utils/data/country_codes";
import { signupUser } from "../features/auth/authSlice";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [value, setValue] = useState();
  const dispatch = useAppDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log(country_codes);
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signupUser(values));
  };

  return (
    <div className="content d-flex align-items-center justify-content-center ">
      {/* <a href="/"> */}
      <img
        src="/assets/logo/main-logo.png"
        className="logo position-absolute"
        style={{ width: "120px" }}
      />
      {/* </a> */}

      <form
        className="form-sign d-flex flex-column justify-content-center "
        style={{ margin: 0 }}
      >
        <div className="mb-4 text-center d-flex flex-column align-items-center">
          <img src="/assets/icons/register.svg" className="illustration mb-3" />
          <h2 className="font-medium primary-color mb-3">
            Try ONJIZ free for 1 month{" "}
          </h2>
          <p>
            By signing up, I agree to the ONJIZ <a href="">Privacy Policy</a>
          </p>
        </div>

        <label className="font-medium primary-color">Email: </label>
        <input
          type="email"
          className="input-form p-2 rounded bg-light-grey"
          id="email"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
          formControlName="email"
          aria-describedby="emailHelp"
          placeholder="name@company.com"
        />
        {/* <div>
          <div className="mt-0 mb-3 red-color">* Email is required</div>
          <div className="mt-0 mb-3 red-color">* Invalid E-mail</div>
        </div> */}

        <label className="font-medium primary-color">Phone Number: </label>

        <div className="d-flex align-items-center bg-light-grey border rounded p-2 mb-3">
          <input
            style={{ background: "transparent", outline: "none" }}
            className="border-0 w-50"
            type="tel"
            placeholder="Phone Number"
            formControlName="phoneNumber"
          />
        </div>
        {/* <div>
          <div className="mt-0 mb-1 red-color">*Phone Number is required.</div>
        </div> */}

        <button
          type="submit"
          className="height-input bg-dark-primary font-medium rounded text-white text-uppercase w-100 border-0 mb-3"
        >
          Try for free
        </button>
      </form>
    </div>
  );
}
