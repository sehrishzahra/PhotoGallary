import { createSlice } from "@reduxjs/toolkit";

interface Tag {
  tags : any; 
}
interface TagedImagesState {
  s: boolean;
}
const initialTagState: Tag = {
  tags : ''
} as Tag

const initialTagedImagesState: TagedImagesState = {
  s: false
};

const TagSlice = createSlice({
  name: "Tags_Data",
  initialState: initialTagState,
  reducers: {
    tags: (state: Tag, action) => {
     state.tags = (action.payload);
    },
  },
});

const TagedImagesSlice = createSlice({
  name: "Taged_Images_Data",
  initialState: initialTagedImagesState, 
  reducers: {
    showTagedImages: (state: TagedImagesState, action) => {
      state.s = action.payload;
    }
  }
});


export const { tags } = TagSlice.actions;
export const { showTagedImages } = TagedImagesSlice.actions;

export const tagReducer = TagSlice.reducer;
export const tagedImagesReducer = TagedImagesSlice.reducer;

