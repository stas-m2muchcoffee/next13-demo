import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isAuth: boolean;
  currentUser?: User;
  isLoading: boolean;
  token: string;
}

export const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  token: "",
};

export const login = createAsyncThunk("login", async () => {
  const mock = {
    Username: "daniel@frtn.nl",
    Password: "askksdfdssd",
  };
  return fetch(`${process.env.NEXT_PUBLIC_ERATI_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mock),
  }).then((res) => res.json());
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.token = action.payload.access_token;
    });
  },
});

export const { logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
