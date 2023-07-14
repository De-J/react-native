import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    histObj: {}
}

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        appendHistory(state, action) {
            console.log(state);
            if (state.histObj.hasOwnProperty(action.payload)) {
                state.histObj[action.payload]++;
            } else {
                state.histObj[action.payload] = 1;
            }
        }
    }
})

export const { appendHistory } = historySlice.actions;

export default historySlice.reducer;