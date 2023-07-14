import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: ""
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        changeVidId(state, action) {
            state.value = action.payload
        }
    }
})

export const { changeVidId } = videoSlice.actions;

export default videoSlice.reducer;