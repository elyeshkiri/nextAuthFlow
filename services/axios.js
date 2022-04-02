import axios from "axios";

import { userSelector, refreshToken } from "../features/auth/authSlice";
import jwt_decode from "jwt-decode";
import { useAppSelector, useAppDispatch } from "../redux_toolkit/hooks";
const user = useAppSelector(userSelector);
const dispatch = useAppDispatch();
export const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
});
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000",
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    if (user?.accessToken) {
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await dispatch(refreshToken());
        if (config?.headers) {
          config.headers["authorization"] = `Bearer ${user.accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
