import { Box, Button, Dialog, DialogActions, IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { Close, CloudUpload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createPolicyData, getCustomerPolicyListData } from '../Redux/Slice/dataSlice';
import toast from 'react-hot-toast';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CreatePolicy = ({ open, handleClose }) => {
    const { loginData } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const policyData = ["home", "car", "health", "other"];
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:1040px)');

    const validationSchema = Yup.object({
        contact: Yup.string()
            .required("Contact Number is required")
            .matches(/^\d+$/, "Contact number should only contain digits")
            .min(10, "Contact number should be at least 10 digits")
            .max(15, "Contact number should not exceed 15 digits"),
        option: Yup.string().required("Please select insurance type"),
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        image: Yup.mixed().required("Image is required")
    });

    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            setFieldValue('image', file);
        }
    };

    const handleCreatePolicy = async (values) => {

        const formData = new FormData();
        formData.append("phoneNumber", values.contact);
        formData.append("type", values.option);
        formData.append("img", values.image);
        formData.append("address", values.address);
        formData.append("city", values.city);
        formData.append("customerId", loginData?.id);

        dispatch(createPolicyData(formData))
            .then((res) => {
                if (res?.payload?.message === "Policy created successfully") {
                    toast.success("Policy created successfully!!");
                    handleClose();
                    dispatch(getCustomerPolicyListData());
                } else {
                    toast.error("There was some error while creating policy.");
                    handleClose();
                }
            });
    };

    return (
        <Dialog open={open} onClose={handleClose} fullScreen={isMobile} maxWidth="sm" fullWidth>
            <Box sx={{ padding: isMobile ? "3vh 4vw" : isTablet ? "4vh 5vw" : "5vh", width: isMobile ? "90vw" : isTablet ? "80vw" : "37vw", height: "auto", position: "relative" }}>
                <IconButton onClick={handleClose} sx={{ position: "absolute", top: "10px", right: "10px", color: "#6200ea" }}>
                    <Close />
                </IconButton>

                <Typography fontWeight={800} fontFamily="inherit" mb={3} sx={{ textAlign: "center", fontSize: isMobile ? "2.5vh" : isTablet ? "3vh" : "3.5vh", textDecoration: "underline" }} color="#6200ea">
                    Create Policy
                </Typography>

                <Box>
                    <Typography sx={{ fontWeight: 750, fontSize: isMobile ? "2vh" : isTablet ? "2.2vh" : "2.5vh" }}>Customer ID: {loginData?.id}</Typography>
                    <Typography sx={{ fontWeight: 750, fontSize: isMobile ? "2vh" : isTablet ? "2.2vh" : "2.5vh" }}>Customer Name: {loginData?.name?.toUpperCase()}</Typography>
                    <Typography sx={{ fontWeight: 750, fontSize: isMobile ? "2vh" : isTablet ? "2.2vh" : "2.5vh" }}>Customer Email: {loginData?.email}</Typography>
                </Box>

                <Formik
                    initialValues={{
                        contact: "",
                        address: "",
                        city: "",
                        option: "",
                        image: null
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleCreatePolicy}
                >
                    {({ setFieldValue, values, touched, errors }) => (
                        <Form>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5vh", marginTop: "2vh" }}>
                                <Field
                                    as={TextField}
                                    label="Contact Number*"
                                    variant="outlined"
                                    type="text"
                                    name="contact"
                                    size={isMobile ? "small" : "medium"}
                                    fullWidth
                                    error={touched.contact && !!errors.contact}
                                    helperText={touched.contact && errors.contact}
                                />

                                <Box>
                                    <label style={{ fontSize: isMobile ? "1.6vh" : "1.8vh", fontWeight: 600 }}>Your insurance is for?<span style={{ color: "red" }}>*</span></label>
                                    <select
                                        id="options"
                                        name="option"
                                        value={values.option}
                                        onChange={e => setFieldValue("option", e.target.value)}
                                        style={{
                                            width: "100%",
                                            padding: isMobile ? "6px" : "9px",
                                            fontSize: "16px",
                                            borderRadius: "5px",
                                            border: "1px solid #6200ea",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <option value="">Choose an option</option>
                                        {policyData.map((item, index) => (
                                            <option value={item} key={index}>{item}</option>
                                        ))}
                                    </select>
                                    {touched.option && errors.option && <div style={{ color: "red", fontSize: "12px" }}>{errors.option}</div>}
                                </Box>

                                <Field
                                    as={TextField}
                                    label="Enter Your Address*"
                                    variant="outlined"
                                    multiline
                                    rows={2}
                                    fullWidth
                                    name="address"
                                    error={touched.address && !!errors.address}
                                    helperText={touched.address && errors.address}
                                />

                                <Field
                                    as={TextField}
                                    label="City*"
                                    variant="outlined"
                                    type="text"
                                    fullWidth
                                    name="city"
                                    error={touched.city && !!errors.city}
                                    helperText={touched.city && errors.city}
                                />

                                <Box textAlign="center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        id="upload-button"
                                        onChange={(e) => handleImageChange(e, setFieldValue)}
                                    />
                                    <label htmlFor="upload-button">
                                        <Button
                                            component="span"
                                            variant="contained"
                                            startIcon={<CloudUpload />}
                                            fullWidth
                                            sx={{
                                                backgroundColor: "#6200ea",
                                                color: "white",
                                                textTransform: "none",
                                                fontWeight: "bold",
                                                borderRadius: "8px",
                                                fontSize: isMobile ? "1.6vh" : "1.8vh"
                                            }}
                                        >
                                            {values.image ? values.image.name : "Upload Image*"}
                                        </Button>
                                    </label>
                                    {touched.image && errors.image && <div style={{ color: "red", fontSize: "12px" }}>{errors.image}</div>}
                                </Box>
                            </Box>

                            <DialogActions sx={{ justifyContent: "center", marginTop: "3vh" }}>
                                <Button type="submit" variant='contained' sx={{
                                    backgroundColor: "#6200ea",
                                    color: "white",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    borderRadius: "8px",
                                    padding: isMobile ? "8px 25px" : "10px 30px"
                                }}>
                                    Create Policy
                                </Button>
                                <Button onClick={handleClose} variant='contained' sx={{
                                    backgroundColor: "#C01B0F",
                                    color: "white",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    borderRadius: "8px",
                                    padding: isMobile ? "8px 25px" : "10px 30px"
                                }}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Dialog>
    );
};

export default CreatePolicy;
