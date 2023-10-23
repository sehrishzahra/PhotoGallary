import { configureStore } from "@reduxjs/toolkit";
import CollectionSlice from "./slices/CollectionSlice";
import RootReducer from "./slices/RootReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {tagReducer} from './slices/TagSlice'
import {tagedImagesReducer} from './slices/TagSlice'
import CollectionImage from "./slices/CollectionImage";


export const store = configureStore({
  reducer: {
    Collection : CollectionSlice ,
    GLOBAL_DATA : RootReducer ,
    Tags_Data : tagReducer ,
    Taged_Images_Data : tagedImagesReducer ,
    CollectionImgData: CollectionImage
  },
});

export const useAppDispatch:()=> typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;