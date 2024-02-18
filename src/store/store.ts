import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import content from "./content/content";
import authorization from "./authorization/authorization";
import headers from "./headers/headers";
import raw from "./raw/raw";
import system from "./system/system";
import request from "./request/request";
import response from "./response/response";
import save from "./save/save";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["save"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    system: system,

    request: request,
    response: response,

    content: content,
    authorization: authorization,
    headers: headers,
    raw: raw,

    save: save,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
