import {createSlice} from "@reduxjs/toolkit";

interface IAuthSlice {
  isAuth: boolean;
}

const initialState: IAuthSlice = {isAuth: false};

const authSlice = createSlice({
  name: "isAuth",
  initialState,
  reducers: {
    setAuth(state) {
      state.isAuth = true
    },
    unAuth(state) {
      state.isAuth = false
    },
  }
})

export const {setAuth, unAuth} = authSlice.actions;
export default authSlice.reducer;