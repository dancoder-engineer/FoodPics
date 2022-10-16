import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {

    },
    reducers: {
    setParam(state, action) {
        console.log(action.payload)
        return({
            ...state,
            [action.payload.param]: action.payload.value
        })  
    },
    setRecipeParam(state, action) { 
        console.log(action.payload)

        let editedRecipe = []

        if(action.payload.id === "avatar") {
            editedRecipe = {
                ...state.recipe,
                avatar: action.payload.value,
                loc: action.payload.id
            } 
        }
        
        else {
            editedRecipe = {
                ...state.recipe,
                [action.payload.id]: action.payload.value
            }
        }
        
        console.log(editedRecipe)
   
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