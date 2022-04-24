import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "./reducers/PostSlice";
import thunkMiddleware from "redux-thunk";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

let store;

const rootReducer = combineReducers({
  postReducer,
});

const initStore = (initialState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [thunkMiddleware],
  });

export const initializeStore = (initialState) => {
  let _store = store ?? initStore(initialState);

  if (initialState && store) {
    _store = initStore({
      ...store.getState(),
      ...initialState,
    });

    store = undefined;
  }

  if (typeof window === "undefined") return _store;

  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
