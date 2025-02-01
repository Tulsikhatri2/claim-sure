import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Slice/authSlice"
import dataReducer from "./Slice/dataSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer
    }
})

export default store