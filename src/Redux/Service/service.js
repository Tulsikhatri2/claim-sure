import axiosInstance from "../axiosInstance";

export const customerLogin = async (loginData) => {
    const response = await axiosInstance.post("/customers/login", loginData);
    console.log(response, "customer login response");
    return response.data;
};

export const surveyorLogin = async (loginData) => {
    const response = await axiosInstance.post("/surveyors/login", loginData);
    console.log(response, "surveyor login response");
    return response.data;
};

export const governmentLogin = async (loginData) => {
    const response = await axiosInstance.post("/government/login", loginData);
    console.log(response, "government login response");
    return response.data;
};

export const customerRegister = async (registerData) => {
    const response = await axiosInstance.get("/customers/register", registerData);
    console.log(response, "register response");
};

export const createPolicy = async (data) => {
    const response = await axiosInstance.post("/customers/create", data);
    console.log(data, "data");
    console.log(response, "create policy response");
    return response.data
};

export const getCustomerPolicyList = async () => {
    const response = await axiosInstance.get("/customers/policies")
    console.log(response, "get api response")
    return response.data
}

export const getGovernmentPolicyList = async () => {
    const response = await axiosInstance.get("/government/policies")
    console.log(response, "government data response")
}
