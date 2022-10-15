import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'post',
    initialState: {
        id: null,
        username: null,
        avatar: null
    },
    reducers: {
    setUser(state, action) {
        console.log(action)
        return{
            id: action.payload.id,
            username: action.payload.username,
            avatar: action.payload.avatar
        }
        // state.id = action.payload.id
        // state.username = action.payload.username
        // state.avatar = action.payload.avatar   
        
    },
    logOut: (state, action) => {
        return {
            id: null,
            username: null,
            avatar: null
        }
    }
    },
   });
   export const {setUser} = userSlice.actions
   export default userSlice.reducer;