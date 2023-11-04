import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userName: null,
    token: null,
    email: '',
    isLoggedIn: false,
    emailVerify: false,
    profilePicture: null,
    notification: null
  },
  reducers: {
    setToken(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isLoggedIn = !!state.token;
    },
    logOutMethod(state) {
      localStorage.removeItem('userDetails');
      state.email = '';
      state.token = null;
      state.isLoggedIn = false;
    },
    updateProfileData(state, action) {
      const { userName, profilePicture } = action.payload;
      state.userName = userName;
      state.profilePicture = profilePicture;
    },
    setLogin(state) {
      const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
      state.token = storedUserDetails ? storedUserDetails.token : null;
      state.email = storedUserDetails ? storedUserDetails.email : '';
      state.isLoggedIn = !!state.token;
    },
    showNotification(state, action) {
      if (action.payload) {
        state.notification = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        };
      } else {
        state.notification = null; 
      }
    },
    userLoginDetails(state, action) {
      const { email, token, displayName, profilePicture, emailVerified } = action.payload;
      state.email = email;
      state.token = token;
      state.userName = displayName;
      state.profilePicture = profilePicture;
      state.isLoggedIn = true;
      state.emailVerify = emailVerified;
    }
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;