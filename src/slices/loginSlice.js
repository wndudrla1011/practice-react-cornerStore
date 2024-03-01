import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

//쿠키에서 로그인 정보 로딩
const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }

  return memberInfo;
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie() || initState, //쿠키가 없다면 초기값 사용
  reducers: {
    login: (state, action) => {
      console.log("login......");

      const data = action.payload; //{email, pw}

      return { email: data.email }; //new state
    },
    logout: () => {
      console.log("logout......");

      removeCookie("member");

      return { ...initState };
    },
  },
  extraReducers: (builder) => {
    builder
      //성공
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");

        const payload = action.payload;

        //정상적인 로그인일 경우 쿠키 저장
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1);
        }

        return payload;
      })
      //처리 중
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      //실패
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
