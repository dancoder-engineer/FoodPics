import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice.js";
const store = configureStore({
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['post/setRecipeParam'],

      },
    }),
    
 reducer: {
 post: postReducer,
 },
});
export default store;