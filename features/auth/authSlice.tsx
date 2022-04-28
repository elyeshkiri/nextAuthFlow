import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (formData: {password?: string }, thunkAPI) => {
    try {
      const password = formData.password;
      delete formData.password;
      const admin = await axios.post(
        process.env.AUTHOST + "/realms/nextonjiz/protocol/openid-connect/token",
        qs.stringify({
          username: process.env.USERNAME,
          password: process.env.PASSWORD,
          client_id: process.env.CLIENTID,
          client_secret: process.env.SECRET,
          grant_type: "password",
        }),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      let adminToken = "Bearer " + admin.data.access_token;
      const newUser = await axios.post(
        process.env.AUTHOST + "/admin/realms/nextonjiz/users",
        {
          ...formData,
          enabled: true,
          credentials: [
            { type: "password", value: password, temporary: false },
          ],
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: adminToken,
          },
        }
      );
      if (newUser.status === 201) {
        return true;
      } else {
        return thunkAPI.rejectWithValue(newUser);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (formData: {}, thunkAPI) => {
    try {
      const response = await axios.post(
        process.env.AUTHOST + "/realms/nextonjiz/protocol/openid-connect/token",
        qs.stringify({
          ...formData,
          client_id: process.env.CLIENTID,
          client_secret: process.env.SECRET,
          grant_type: "password",
        }),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      let data = response.data;

      if (response.status === 200) {
        // store only access-token and refresh token
        const storedData = {
          access_token: data.access_token,
          refreshToken: data.refresh_token,
        };
        localStorage.setItem("token", JSON.stringify(storedData));
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const refreshToken = createAsyncThunk(`users/refreshToken`, async (_: void, thunkAPI) => {
  try {
    let state = JSON.parse(localStorage.getItem("token") || "");
    const res = await axios.post(
      "http://localhost:8080/auth/realms/nextonjiz/protocol/openid-connect/token",
      qs.stringify({
        refresh_token: state.refresh_token,
        client_id: process.env.CLIENTID,
        client_secret: process.env.SECRET,
        grant_type: "refresh_token",
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    let data = res.data;
    if (res.status === 200) {
      const storedData = {
        access_token: data.access_token,
        refreshToken: data.refresh_token,
      };
      localStorage.setItem("token", JSON.stringify(storedData));
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e: any) {
    thunkAPI.rejectWithValue(e.response.data);
  }
});
export const logoutUser = createAsyncThunk(`users/logoutUser`, async (_: void, thunkAPI) => {
  try {
    let state = JSON.parse(localStorage.getItem("token") || "");
    const res = await axios.post(
      "http://localhost:8080/auth/realms/nextonjiz/protocol/openid-connect/logout",
      qs.stringify({
        refresh_token: state.refresh_token,
        client_id: process.env.CLIENTID,
        client_secret: process.env.SECRET,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    let data = res.data;
    if (res.status === 204) {
      // Remove token from local storage
      localStorage.removeItem("token");
      setAuthToken("");
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e: any) {
    thunkAPI.rejectWithValue(e.response.data);
  }
});
export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    accessToken: "",
    refresh_token: "",
    signUpToken: "",
    isAuthenticated: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
 //     state.signUpToken = payload.access_token;
    }), 
    builder.addCase(signupUser.pending, (state) => {
      state.isFetching = true;
    }),
    builder.addCase(signupUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message
    }),
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.email = payload.email;
      state.isAuthenticated = true;
      state.username = payload.name;
      state.accessToken = payload.access_token;
      state.refresh_token = payload.refresh_token;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    }),
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    }),
    builder.addCase(loginUser.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    }),
    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.isAuthenticated = true;
      state.accessToken = payload.access_token;
      state.refresh_token = payload.refresh_token;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    }),
    builder.addCase(refreshToken.pending, (state, { payload }) => {
      state.isFetching = true
      return state;
    }),
    builder.addCase(refreshToken.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    })
  }
  
  
});
export const { clearState } = userSlice.actions;
export const userSelector = (state) => state.user;
