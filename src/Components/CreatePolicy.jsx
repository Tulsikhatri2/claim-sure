import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Close, CloudUpload } from "@mui/icons-material";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createPolicyData } from '../Redux/Slice/dataSlice';


const CreatePolicy = ({ open, handleClose }) => {
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("")
    const [isOther, setIsOther] = useState(false)
    const [option, setOption] = useState("Select an asset")
    const policyData = ["Vehicle Insurance", "Property Insurance", "Health Insurance", "Life Insurance", "Travel Insurance", "Other"]
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("Upload Image*");
    const { loginData } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageName(file.name);
        }
    };

    useEffect(() => {
        if (option == "Other") {
            setIsOther(true)
        } else {
            setIsOther(false)
        }
    }, [option])

    // const formData = new FormData();
    // formData.append("phoneNumber", contact);
    // formData.append("type", option);
    // formData.append("img", image); // Image file
    // formData.append("address", address);
    // formData.append("city", city);

    const handleCreatePolicy = async () => {
        const toBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };
        const base64Image = await toBase64(image);
        console.log(base64Image, "image")
        const formData = new FormData();
        formData.append("phoneNumber", contact);
        formData.append("type", option);
        formData.append("img", base64Image);
        formData.append("address", address);
        formData.append("city", city);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        dispatch(createPolicyData(formData));


    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {/* Dialog Content */}
            <div style={{ padding: "5vh", height: "75vh", width: "37vw", position: "relative" }}>
                {/* Close Button */}
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        color: "#6200ea",
                        "&:hover": { color: "#4500b5" }
                    }}
                >
                    <Close />
                </IconButton>

                {/* Title */}
                <Typography
                    fontWeight={"800"}
                    fontFamily={"inherit"}
                    mb={3}
                    sx={{ textDecoration: "underline", textAlign: "center", fontSize: "3.5vh" }}
                    color='#6200ea'
                >
                    Create Policy
                </Typography>

                {/* Customer Details */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    lineHeight: "0.3vh"
                }}>
                    <Typography sx={{ fontWeight: "750", fontSize: "2.5vh" }}>Customer ID: {loginData?.id}</Typography>
                    <Typography sx={{ fontWeight: "750", fontSize: "2.5vh" }}>Customer Name: {loginData?.name?.toUpperCase()}</Typography>
                    <Typography sx={{ fontWeight: "750", fontSize: "2.5vh" }}>Customer Email: {loginData?.email}</Typography>
                </div>

                {/* Form Inputs */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "2vh",
                    marginTop: "3vh"
                }}>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "2vh",
                        marginTop: "-2vh"
                    }}>
                        <TextField
                            label="Contact Number*"
                            variant="outlined"
                            type="text"
                            value={contact}
                            size="small"
                            sx={{
                                fontFamily: "inherit",
                                "& .MuiInputBase-root": {
                                    width: "15vw",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    paddingX: "0.7vw",
                                    "& fieldset": { borderColor: "#6200ea" },
                                    "&:hover fieldset": { borderColor: "#4500b5" },
                                    "&.Mui-focused fieldset": { borderColor: "#3700b3" }
                                },
                                "& .MuiOutlinedInput-input": { padding: "8px 12px" }
                            }}
                            onChange={(e) => setContact(e.target.value)}
                        />

                        <div style={{ display: "flex", flexDirection: "column", marginBottom: "2.5vh" }}>
                            <label style={{ fontSize: "1.8vh", fontWeight: "600" }}>
                                Your insurance is for?<span style={{ color: "red" }}>*</span>
                            </label>
                            <select
                                id="options"
                                value={option}
                                onChange={(e) => setOption(e.target.value)}
                                style={{
                                    width: "16vw",
                                    paddingBlock: "9px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    border: "1px solid #6200ea",
                                    cursor: "pointer",
                                    paddingInline: "12px"
                                }}
                            >
                                <option value="">Choose an option</option>
                                {policyData.map((item, index) => (
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {isOther && (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2vh",
                            marginTop: "-3vh"
                        }}>
                            <TextField
                                label="Specify Other Option*"
                                variant="outlined"
                                type="text"
                                value={contact}
                                size="small"
                                sx={{
                                    fontFamily: "inherit",
                                    "& .MuiInputBase-root": {
                                        width: "32vw",
                                        height: "40px",
                                        display: "flex",
                                        alignItems: "center",
                                        paddingX: "0.7vw",
                                        "& fieldset": { borderColor: "#6200ea" },
                                        "&:hover fieldset": { borderColor: "#4500b5" },
                                        "&.Mui-focused fieldset": { borderColor: "#3700b3" }
                                    },
                                    "& .MuiOutlinedInput-input": { padding: "8px 12px" }
                                }}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Address Field */}
                    <Box sx={{ width: "100%" }}>
                        <TextField
                            label="Enter Your Address*"
                            variant="outlined"
                            multiline
                            rows={2}
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your full address..."
                            sx={{
                                backgroundColor: "#f9f9f9",
                                marginTop: "-0.5vh",
                                borderRadius: "8px",
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "#6200ea" },
                                    "&:hover fieldset": { borderColor: "#4500b5" },
                                    "&.Mui-focused fieldset": { borderColor: "#3700b3" }
                                }
                            }}
                        />
                    </Box>

                    {/* City and File Upload */}
                    <div style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "2vh"
                    }}>
                        <TextField
                            label="City*"
                            variant="outlined"
                            type="text"
                            value={city}
                            size="small"
                            sx={{
                                fontFamily: "inherit",
                                "& .MuiInputBase-root": {
                                    width: "15vw",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    paddingX: "0.7vw",
                                    "& fieldset": { borderColor: "#6200ea" },
                                    "&:hover fieldset": { borderColor: "#4500b5" },
                                    "&.Mui-focused fieldset": { borderColor: "#3700b3" }
                                },
                                "& .MuiOutlinedInput-input": { padding: "8px 12px" }
                            }}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <Box sx={{ textAlign: "center" }}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                id="upload-button"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="upload-button">
                                <Button
                                    component="span"
                                    variant="contained"
                                    startIcon={<CloudUpload />}
                                    sx={{
                                        backgroundColor: "#6200ea",
                                        color: "white",
                                        textTransform: "none",
                                        fontWeight: "bold",
                                        padding: "15px 57px",
                                        borderRadius: "8px",
                                        height: "5.4vh",
                                        width: "16.3vw",
                                        "&:hover": { backgroundColor: "#4500b5" }
                                    }}
                                >
                                    {imageName.length > 20 ? `${imageName.substring(0, 17)}...` : imageName}
                                </Button>
                            </label>
                        </Box>
                    </div>
                </div>

                {/* Action Buttons */}
                <DialogActions sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "5vh"
                }}>
                    <Button onClick={handleCreatePolicy} variant='contained'
                        sx={{
                            backgroundColor: "#6200ea",
                            color: "white",
                            textTransform: "none",
                            fontWeight: "bold",
                            padding: "10px 30px",
                            borderRadius: "8px",
                            height: "5.4vh",
                            "&:hover": { backgroundColor: "#4500b5" }
                        }}>
                        Create Policy
                    </Button>
                    <Button onClick={handleClose} variant='contained'
                        sx={{
                            backgroundColor: "#C01B0F",
                            color: "white",
                            textTransform: "none",
                            fontWeight: "bold",
                            padding: "10px 30px",
                            borderRadius: "8px",
                            height: "5.4vh",
                            "&:hover": { backgroundColor: "#4500b5" }
                        }}>
                        Close
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    )
}

export default CreatePolicy