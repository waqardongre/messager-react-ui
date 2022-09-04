import { configureStore } from "@reduxjs/toolkit"
import { stateReducer } from "./stateSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"



const persistConfig = {
  key: "main-root",
  storage
}

const persistedReducer = persistReducer(persistConfig, stateReducer)

export const store = configureStore({
  reducer: {
    theState: persistedReducer,
  },
  middleware: [thunk]
})

export const Persistor = persistStore(store)