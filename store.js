import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./slices/videoSlice";
import historyReducer from "./slices/historySlice"

export const store = configureStore({
    reducer: {
        videoId: videoReducer,
        history: historyReducer
    }
})