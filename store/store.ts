import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/PostSlice";
import thunkMiddleware from "redux-thunk";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
