import { configureStore, combineReducers } from '@reduxjs/toolkit'
import Authslice from './Authslice'

// Define the root state type
export type RootState = ReturnType<typeof Store.getState>

const rootReducer = combineReducers({
     auth: Authslice.reducer,
})

const Store = configureStore({
     reducer: rootReducer,
     devTools: true,
})

export default Store
