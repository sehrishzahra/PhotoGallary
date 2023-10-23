import { createSlice } from "@reduxjs/toolkit";

// interface CounterState {
//   data: any[];
// }

// const initialState: CounterState = {
//   data: []
// };

const CollectionImage = createSlice({
  name: "CollectionImgData",
  initialState: [],
  reducers: {
    addingImageToCollection: (state:any , action) => {
      console.log('Adding image to collection:', action.payload);
      state =  [...state , state.unshift(action.payload)]
      // return {
      //   ...state,
      //   data: [action.payload, ...state.data],
      // };
    },
    removingImageToCollection: (state: any , action ) => {
      console.log('Removing image to collection:', action.payload);
      state =  [...state , state.shift(action.payload)]
    }
  },
});

export const {addingImageToCollection , removingImageToCollection } = CollectionImage.actions;
export default CollectionImage.reducer;
