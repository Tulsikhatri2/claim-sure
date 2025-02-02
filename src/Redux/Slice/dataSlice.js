import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { claimPolicy, createPolicy, getCustomerPolicyList, getGovernmentRequestedList } from "../Service/service";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        customerPolicyList: [],
        loadingData: false,
        successData: false,
        errorData: false,
        createPolicyloading: false,
        createPolicySuccess: false,
        createPolicyError: false,
        governmentListLoading: false,
        governmentListSuccess: false,
        governmentListError: false,
        governmentRequestedList: []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPolicyData.pending, (state, action) => {
                state.createPolicyloading = true
                state.createPolicySuccess = false
                state.createPolicyError = false
            })
            .addCase(createPolicyData.fulfilled, (state, action) => {
                state.createPolicyloading = false
                state.createPolicySuccess = true
                state.createPolicyError = false
            })
            .addCase(createPolicyData.rejected, (state, action) => {
                state.createPolicyloading = false
                state.createPolicySuccess = false
                state.createPolicyError = true
            })
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
            .addCase(governmentRequestList.pending, (state, action) => {
                state.governmentListLoading = true
                state.governmentListSuccess = false
                state.governmentListError = false
            })
            .addCase(governmentRequestList.fulfilled, (state, action) => {
                state.governmentListLoading = false
                state.governmentListSuccess = true
                state.governmentListError = false
                state.governmentRequestedList = action.payload?.policies
            })
            .addCase(governmentRequestList.rejected, (state, action) => {
                state.governmentListLoading = false
                state.governmentListSuccess = false
                state.governmentListError = true
            })
    }
})

export const createPolicyData = createAsyncThunk(
    "CREATE/POLICY",
    async (data) => {
        try {
            const response = await createPolicy(data)
            return response
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
            const response = await getGovernmentRequestedList()
            console.log(response, "requested policies list")
            return response
        } catch (error) {

        }
    }
)

export const claimCustomerPolicy = createAsyncThunk(
    "CLAIM/POLICY/DATA",
    async (id) => {
        try {
            const response = await claimPolicy(id)
        } catch (error) {

        }
    }
)

export default dataSlice.reducer