import { createSlice}  from '@reduxjs/toolkit';

const initialState = {
  // check for existing state before creating new state in localstorage
  userInfo : localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null,
}
//save auth in local storage and redux store
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // save and update user info
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // remove user info from local storage and redux store 
    logout: (state,action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    // setUserInfo: (state, action) => {
    //   state.userInfo = action.payload
    // },
  },
})

export  const { setCredentials , logout } = authSlice.actions

export default authSlice.reducer