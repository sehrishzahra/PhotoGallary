import { createSlice } from "@reduxjs/toolkit";

const CollectionSlice = createSlice({
  name: "Collection",
  initialState: [{
    id: 0,
    img: '',
    colName: '',
    count: 1,
  }],
  reducers: {
    addItem: (state: any, action) => {
      state.push(action.payload);
    },
  },
});

export const {addItem} = CollectionSlice.actions;
export default CollectionSlice.reducer;
