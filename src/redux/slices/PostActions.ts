/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostActionsInterface {
    isPostEditMode: boolean
}

const initialState: PostActionsInterface = {
    isPostEditMode: false
};

export const myAccountSlice = createSlice({
  name: 'MyAccount',
  initialState,
  reducers: {
    setPostEditMode: (state, action: PayloadAction<boolean>) => {
      state.isPostEditMode = action.payload;
    }
  },
});

export const {
    setPostEditMode
} = myAccountSlice.actions;

export default myAccountSlice.reducer;
