import { createSlice } from '@reduxjs/toolkit';

const userSliceb = createSlice({
    name: 'games',
    initialState: {
    entities: [],
    },
    reducers: {
    setUser: (state, action) => {
    return {...state,
    entities: [...state.entities,
    action.payload]}
    },
    logOut: (state, action) => {
        return {}
    }
    },
   });
   export const {setUser} = userSlice.actions
   export default userSlice.reducer;