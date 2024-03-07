import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "./store";
const initialState={
    posts:{},

}

const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{
        getPost(state,action){
            state.posts=action.payload
        }
    }
})

export default postSlice.reducer

export function setPost(post){
    return (dispatch,getState)=>{
        dispatch(postSlice.actions.getPost(post))
    }
}