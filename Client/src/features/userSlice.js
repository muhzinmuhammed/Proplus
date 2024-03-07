import { createSlice,} from "@reduxjs/toolkit";



const initialState = {
  user: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    signup:(state, action) =>{
        state.user = action.payload;

    },
    logout: (state) => {
      state.user = '';
    },
  },
});

export const { login, logout,signup } = userSlice.actions;
export const selectUser = (state ) => state.user.user

export default userSlice.reducer;