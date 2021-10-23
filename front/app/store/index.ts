import {combineReducers, configureStore} from '@reduxjs/toolkit'
import booksReducer from './booksSlice'

const rootReducer = combineReducers({
    books: booksReducer,
})

const store =  configureStore({
    reducer: rootReducer,
})

export default store