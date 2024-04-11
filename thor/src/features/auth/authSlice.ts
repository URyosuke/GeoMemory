import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { PROPS_AUTHEN, PROPS_PROFIEL, PROPS_NICKNAME } from "../types";
require("dotenv").config();
const apiUrl = "http://localhost:8080/";

export const fetchAsyncLogin = createAsyncThunk(
  "auth/post",
  async (authen: PROPS_AUTHEN) => {
    const res = await axios.post(`${apiUrl}api/account/signin`, authen, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  "auth/register",
  async (auth: PROPS_AUTHEN) => {
    const res = await axios.post(`${apiUrl}api/account/signup`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncCreateProf = createAsyncThunk(
  "profile/post",
  async (profData: PROPS_NICKNAME) => {
    const res = await axios.post(`${apiUrl}api/profile/regist`, profData, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncUpdateProf = createAsyncThunk(
  "profile/put",
  async (profile: PROPS_PROFIEL) => {
    const uploadData = new FormData();
    uploadData.append("nickName", profile.nickName);
    profile.img && uploadData.append("img", profile.img, profile.img.name);
    const res = await axios.put(
      `${apiUrl}api/profile/update/${profile.id}/`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          //個々変更お予定
          // Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);
//修正の必要あり
export const fetchAsyncGetMyProf = createAsyncThunk(
  "profile/get",
  async (userid: number) => {
    const res = await axios.get(`${apiUrl}api/profile/get/${userid}`, {
      // headers: {
      // Authorization: `JWT ${localStorage.localJWT}`,
      // },
    });
    return res.data;
  }
);
//プロフィール情報を渡してもらう関数は何かしら必要
export const fetchAsyncGetProfs = createAsyncThunk("profiles/get", async () => {
  const res = await axios.get(`${apiUrl}api/profile/get/all`, {
    // headers: {
    // Authorization: `JWT ${localStorage.localJWT}`,
    // },
  });
  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    //サインインのモーダルの管理を行う
    openSignIn: true,
    //レジスター用（おそらくプロフィール更新用）のモーダルの制御
    openSignUp: false,
    //プロフィールのモーダル制御
    openProfile: false,
    //非同期処理中はtrue
    isLoadingAuth: false,
    myprofile: {
      id: 0,
      nickName: "",
      userProfile: 0,
      created_on: "",
      img: "",
    },
    profiles: [
      {
        id: 0,
        nickName: "",
        userProfile: 0,
        created_on: "",
        img: "",
      },
    ],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    fetchCredStart(state) {
      state.isLoadingAuth = true;
    },
    fetchCredEnd(state) {
      state.isLoadingAuth = false;
    },
    setOpenSignIn(state) {
      state.openSignIn = true;
    },
    resetOpenSignIn(state) {
      state.openSignIn = false;
      // console.log('Yes')
    },
    setOpenSignUp(state) {
      state.openSignUp = true;
    },
    resetOpenSignUp(state) {
      state.openSignUp = false;
    },
    setOpenProfile(state) {
      state.openProfile = true;
    },
    resetOpenProfile(state) {
      state.openProfile = false;
    },
    editNickname(state, action) {
      state.myprofile.nickName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      //jwtの場合はrefreshとaccessというプロパティが存在するためaccessを使用
      console.log(action);
      localStorage.setItem("userid", action.payload);
    });
    builder.addCase(fetchAsyncCreateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(fetchAsyncGetMyProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(fetchAsyncGetProfs.fulfilled, (state, action) => {
      state.profiles = action.payload;
    });
    builder.addCase(fetchAsyncUpdateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
      state.profiles = state.profiles.map((prof) =>
        prof.id === action.payload.id ? action.payload : prof
      );
    });
  },
});

export const {
  fetchCredStart,
  fetchCredEnd,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenProfile,
  resetOpenProfile,
  editNickname,
} = authSlice.actions;

export const selectIsLoadingAuth = (state: RootState) =>
  state.auth.isLoadingAuth;
export const selectOpenSignIn = (state: RootState) => state.auth.openSignIn;
export const selectOpenSignUp = (state: RootState) => state.auth.openSignUp;
export const selectOpenProfile = (state: RootState) => state.auth.openProfile;
export const selectProfile = (state: RootState) => state.auth.myprofile;
export const selectProfiles = (state: RootState) => state.auth.profiles;

export default authSlice.reducer;
