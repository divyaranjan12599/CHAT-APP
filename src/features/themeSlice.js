import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: false,
    reducers: {
        toggleTheme: (state) => {
            // console.log("sjkhsdfjk", state);
            state = !state;
            return state;
        },
    }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

// export const themeChangeReducer = (state = false, action) => {
//     // console.log(state, action);
//     // Check to see if the reducer cares about this action
//     if (action.type === 'theme/toggle') {
//         // If so, make a copy of `state`
//         return {
//             ...state,
//             // and update the copy with the new value
//             value: !state
//         }
//     }
//     // otherwise return the existing state unchanged
//     return state
// }