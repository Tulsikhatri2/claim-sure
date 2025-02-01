import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { customerLogin, customerRegister, governmentLogin, surveyorLogin } from '../Service/service'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loginData: {},
        loginLoading: false,
        loginSuccess: false,
        loginError: false,
        registerLoading: false,
        registerSuccess: false,
        registerError: false
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(customerLoginResponse.pending, (state, action) => {
                state.loginLoading = true
                state.loginSuccess = false
                state.loginError = false
            })
            .addCase(customerLoginResponse.fulfilled, (state, action) => {
                state.loginLoading = false
                state.loginSuccess = true
                state.loginError = false
                state.loginData = action.payload.customer
                localStorage.setItem("token", action.payload?.token)
            })
            .addCase(customerLoginResponse.rejected, (state, action) => {
                state.loginLoading = false
                state.loginSuccess = false
                state.loginError = true
            })
            .addCase(surveyorLoginResponse.pending, (state, action) => {
                state.loginLoading = true
                state.loginSuccess = false
                state.loginError = false
            })
            .addCase(surveyorLoginResponse.fulfilled, (state, action) => {
                state.loginLoading = false
                state.loginSuccess = true
                state.loginError = false
                // state.loginData = action.payload
                // localStorage.setItem("token", action.payload?.token)
            })
            .addCase(surveyorLoginResponse.rejected, (state, action) => {
                state.loginLoading = false
                state.loginSuccess = false
                state.loginError = true
            })
            .addCase(governmentLoginResponse.pending, (state, action) => {
                state.loginLoading = true
                state.loginSuccess = false
                state.loginError = false
            })
            .addCase(governmentLoginResponse.fulfilled, (state, action) => {
                state.loginLoading = false
                state.loginSuccess = true
                state.loginError = false
                state.loginData = action.payload
                localStorage.setItem("token", action.payload?.token)
            })
            .addCase(governmentLoginResponse.rejected, (state, action) => {
                state.loginLoading = false
                state.loginSuccess = false
                state.loginError = true
            })
            .addCase(registerCustomer.pending, (state, action) => {
                state.registerLoading = true
                state.registerSuccess = false
                state.registerError = false
            })
            .addCase(registerCustomer.fulfilled, (state, action) => {
                state.registerLoading = false
                state.registerSuccess = true
                state.registerError = false
                // state.loginData = action.payload
                // localStorage.setItem("token", action.payload?.token)
            })
            .addCase(registerCustomer.rejected, (state, action) => {
                state.loginLoading = false
                state.registerSuccess = false
                state.registerError = true
            })
    }
})


export const customerLoginResponse = createAsyncThunk(
    "CUSTOMER/LOGIN",
    async (loginData) => {
        try {
            const response = customerLogin(loginData)
            return response
        } catch (error) {
            console.log("Login error: ", error)
        }
    }
)

export const surveyorLoginResponse = createAsyncThunk(
    "SURVEYOR/LOGIN",
    async (loginData) => {
        try {
            const response = surveyorLogin(loginData)
            return response
        } catch (error) {
            console.log("Login error: ", error)
        }
    }
)

export const governmentLoginResponse = createAsyncThunk(
    "GOVERNMENT/LOGIN",
    async (loginData) => {
        try {
            const response = governmentLogin(loginData)
            return response
        } catch (error) {
            console.log("Login error: ", error)
        }
    }
)

export const registerCustomer = createAsyncThunk(
    "REGISTER/CUSTOMER",
    async (registerData) => {
        try {
            const response = customerRegister(registerData)
        } catch (error) {
            console.log("Register Data: ", error)
        }
    }
)
export default authSlice.reducer