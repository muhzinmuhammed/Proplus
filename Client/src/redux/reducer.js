import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './userSlice'
import themeSlice from './theme'
import postSlice from './postSlice'

const rootReducer=({
    user:userSlice,
    theme:themeSlice,
    post:postSlice
})


export {rootReducer}