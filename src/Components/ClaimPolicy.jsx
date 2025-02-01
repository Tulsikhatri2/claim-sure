import { Close, CloudUpload } from '@mui/icons-material'
import { Box, Button, Dialog, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ClaimPolicy = ({ open, handleClose }) => {
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("Upload Damage Image*");
    const { loginData } = useSelector(state => state.auth)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImageName(file.name); // Update button text with file name
        }
    };

    console.log(image, "image")

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {/* Dialog Content */}
            <div style={{ padding: "5vh", height: "60vh", width: "37vw", position: "relative" }}>
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
                    Claim Policy
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

                {/* Description Input */}
                <Box sx={{ width: "100%" }}>
                    <TextField
                        label="Enter description*"
                        variant="outlined"
                        multiline
                        rows={2}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your full address..."
                        sx={{
                            backgroundColor: "#f9f9f9",
                            borderRadius: "8px",
                            marginTop: "2vh",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "#6200ea" },
                                "&:hover fieldset": { borderColor: "#4500b5" },
                                "&.Mui-focused fieldset": { borderColor: "#3700b3" }
                            }
                        }}
                    />
                </Box>

                {/* Upload Button */}
                <Box sx={{ textAlign: "center", marginTop: "2vh" }}>
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
                                padding: "10px 57px",
                                borderRadius: "8px",
                                height: "5.4vh",
                                "&:hover": { backgroundColor: "#4500b5" }
                            }}
                        >
                            {imageName.length > 20 ? `${imageName.substring(0, 17)}...` : imageName}
                        </Button>
                    </label>
                </Box>
                <Box sx={{ marginTop: "5vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "2vh" }}>
                    <Button
                        component="span"
                        variant="contained"
                        sx={{
                            backgroundColor: "#C01B0F",
                            color: "white",
                            textTransform: "none",
                            fontWeight: "bold",
                            padding: "10px 57px",
                            borderRadius: "8px",
                            height: "5.4vh",
                            "&:hover": { backgroundColor: "#4500b5" }
                        }}
                    >
                        Claim Policy
                    </Button>
                </Box>
            </div>
        </Dialog>
    )
}

export default ClaimPolicy