import { Box, Button, Dialog, DialogActions, IconButton, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { Close, CloudUpload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createPolicyData, getCustomerPolicyListData } from '../Redux/Slice/dataSlice';
import toast from 'react-hot-toast';

const CreatePolicy = ({ open, handleClose }) => {
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [option, setOption] = useState("");
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("Upload Image*");
    const { loginData } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const policyData = ["home", "car", "health", "other"];
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:1040px)');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageName(file.name);
        }
    };

    const handleCreatePolicy = async () => {
        if (!image || !city || !option || !contact || !address) {
            console.error("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append("phoneNumber", contact);
        formData.append("type", option);
        formData.append("img", image);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("customerId", loginData?.id);

        dispatch(createPolicyData(formData))
            .then((res) => {
                console.log(res, "response of creating policy")
                if (res?.payload?.message == "Policy created successfully") {
                    toast.success("Policy created successfully!!")
                    handleClose()
                    dispatch(getCustomerPolicyListData())
                }
                else {
                    toast.error("There was some error while creating policy.!!")
                    handleClose()
                }
            })
        setCity("")
        setContact("")
        setImage(null)
        setOption("")
        setAddress("")
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={isMobile}
            maxWidth="sm"
            fullWidth
        >
            <Box sx={{
                padding: isMobile ? "3vh 4vw" : isTablet ? "4vh 5vw" : "5vh",
                width: isMobile ? "90vw" : isTablet ? "80vw" : "37vw",
                height: "auto",
                position: "relative"
            }}>
                <IconButton onClick={handleClose} sx={{ position: "absolute", top: "10px", right: "10px", color: "#6200ea" }}>
                    <Close />
                </IconButton>

                <Typography fontWeight={800} fontFamily="inherit" mb={3} sx={{
                    textAlign: "center",
                    fontSize: isMobile ? "2.5vh" : isTablet ? "3vh" : "3.5vh",
                    textDecoration: "underline"
                }} color="#6200ea">
                    Create Policy
                </Typography>

                <Box>
                    <Typography sx={{ fontWeight: 750, fontSize: isMobile ? "2vh" : isTablet ? "2.2vh" : "2.5vh" }}>Customer ID: {loginData?.id}</Typography>
                    <Typography sx={{ fontWeight: 750, fontSize: isMobile ? "2vh" : isTablet ? "2.2vh" : "2.5vh" }}>Customer Name: {loginData?.name?.toUpperCase()}</Typography>
                    <Typography sx={{ fontWeight: 750, fontSize: isMobile ? "2vh" : isTablet ? "2.2vh" : "2.5vh" }}>Customer Email: {loginData?.email}</Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5vh", marginTop: "2vh" }}>
                    <TextField label="Contact Number*" variant="outlined" type="text" value={contact} size={isMobile ? "small" : "medium"} fullWidth onChange={(e) => setContact(e.target.value)} />

                    <Box>
                        <label style={{ fontSize: isMobile ? "1.6vh" : "1.8vh", fontWeight: 600 }}>Your insurance is for?<span style={{ color: "red" }}>*</span></label>
                        <select id="options" value={option} onChange={(e) => setOption(e.target.value)} style={{
                            width: "100%",
                            padding: isMobile ? "6px" : "9px",
                            fontSize: "16px",
                            borderRadius: "5px",
                            border: "1px solid #6200ea",
                            cursor: "pointer"
                        }}>
                            <option value="">Choose an option</option>
                            {policyData.map((item, index) => (
                                <option value={item} key={index}>{item}</option>
                            ))}
                        </select>
                    </Box>

                    <TextField label="Enter Your Address*" variant="outlined" multiline rows={2} fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
                    <TextField label="City*" variant="outlined" type="text" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />

                    <Box textAlign="center">
                        <input type="file" accept="image/*" style={{ display: "none" }} id="upload-button" onChange={handleImageChange} />
                        <label htmlFor="upload-button">
                            <Button component="span" variant="contained" startIcon={<CloudUpload />} fullWidth sx={{
                                backgroundColor: "#6200ea",
                                color: "white",
                                textTransform: "none",
                                fontWeight: "bold",
                                borderRadius: "8px",
                                fontSize: isMobile ? "1.6vh" : "1.8vh"
                            }}>
                                {imageName.length > 20 ? `${imageName.substring(0, 17)}...` : imageName}
                            </Button>
                        </label>
                    </Box>
                </Box>

                <DialogActions sx={{ justifyContent: "center", marginTop: "3vh" }}>
                    <Button onClick={handleCreatePolicy} variant='contained' sx={{
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
            </Box>
        </Dialog>
    );
};

export default CreatePolicy;
