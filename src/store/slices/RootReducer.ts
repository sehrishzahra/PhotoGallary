import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  data: any
}

const initialState = { data : '' } as CounterState


const rootReducer = createSlice({
  name: "GLOBAL_DATA",
  initialState,
  reducers: {
    globalData: (state: any, action) => {
      state.data = action.payload;
    },
    updateData : (state:any, action) => {
      state.data.unshift(action.payload)
    }
  },
});

export default rootReducer.reducer;
export const { globalData   } = rootReducer.actions;
export const {updateData} = rootReducer.actions;
