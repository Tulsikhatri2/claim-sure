import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPolicy, getCustomerPolicyList, getGovernmentPolicyList } from "../Service/service";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        customerPolicyList: [],
        loadingData: false,
        successData: false,
        errorData: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomerPolicyListData.pending, (state, action) => {
                state.loadingData = true
                state.successData = false
                state.errorData = false
            })
            .addCase(getCustomerPolicyListData.fulfilled, (state, action) => {
                state.loadingData = false
                state.successData = true
                state.errorData = false
                state.customerPolicyList = action?.payload?.policies
            })
            .addCase(getCustomerPolicyListData.rejected, (state, action) => {
                state.loadingData = false
                state.successData = false
                state.errorData = true
            })
    }
})

export const createPolicyData = createAsyncThunk(
    "CREATE/POLICY",
    async (data) => {
        try {
            const resposne = await createPolicy(data)
        } catch (error) {

        }
    }
)

export const getCustomerPolicyListData = createAsyncThunk(
    "GET/POLICY/LIST",
    async () => {
        try {
            const response = await getCustomerPolicyList()
            return response
        } catch (error) {

        }
    }
)

export const governmentRequestList = createAsyncThunk(
    "GET/GOVERNMENT/POLICY/LIST",
    async () => {
        try {
            const response = await getGovernmentPolicyList()
        } catch (error) {

        }
    }
)

export default dataSlice.reducer