import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {},
        recipe: {},
        captions: []
    },
    reducers: {
    setParam(state, action) {
        let editedPost = {
            ...state.post,
            [action.payload.param]: action.payload.value
        } 
        return({
            ...state,
            post: editedPost
        })  
    },

    setRecipeParam(state, action) { 
        console.log(action.payload)

        let editedRecipe = []

        if(action.payload.id === "pic") {
            editedRecipe = {
                ...state.recipe,
                pic: action.payload.value,
                loc: action.payload.id
            } 
        }
        
        else {
            editedRecipe = {
                ...state.recipe,
                [action.payload.id]: action.payload.value
            }
        }
   
        return({
            ...state,
            recipe: editedRecipe
        })
    },



    setCaptions(state, action) { console.log(action)
            let captions
            if (state.captions) { captions= [...state.captions] }
            else {captions = [] }
            let place=parseInt(action.payload.id.split('caption')[1])
            captions[place] = action.payload.value
            return({
                ...state,
                captions: captions
            })
    }

    },
   });
   export const {setParam, setRecipeParam, setCaptions} = postSlice.actions
   export default postSlice.reducer;