import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// combine the reducers into a single reducer 

const rootReducer = combineReducers({
  user:userReducer,
})

const persistConfig = {
  key:'root', // hwere the data will be stored
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  // reducer: {
  //   user:userReducer,
  // },
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({serializableCheck:false})
  
})

export const persistor = persistStore(store)