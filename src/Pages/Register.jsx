import axios from 'axios';
import React, { useState } from 'react'
import registermage from "../Assets/register-image.jpg"
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }

    const handleRegister = async () => {
        const response = await axios.post(" http://localhost:12000/api/customers/register", {
            name: registerData.name,
            email: registerData.email,
            password: registerData.password
        })
        setRegisterData({ name: "", email: "", password: "" })
        if (response?.data?.name) {
            navigate("/")
            toast.success("Registered Successfully, Login with your credentials...")
        }
        console.log(response, "register response")
    }

    return (
        <div
            style={{
                width: "95vw",
                height: "87vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5vw",
                padding: "5vh",
            }}
        >
            <Box
                sx={{
                    width: "50%",
                    height: "80%",
                    backgroundImage: `url(${registermage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                }}
            ></Box>

            <Box
                elevation={3}
                sx={{
                    width: "50%",
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        paddingY: "10vh",
                        boxShadow: 6,
                    }}>
                    <Typography variant="h5" fontWeight={"bold"} color="primary" fontFamily={"inherit"} mb={3}
                        sx={{ textDecoration: "underline" }}>
                        Register
                    </Typography>
                    <TextField
                        label="Name"
                        type='text'
                        variant="outlined"
                        margin="normal"
                        sx={{ width: "50%", fontFamily: "inherit" }}
                        value={registerData.name} name="name" onChange={handleChange}
                    />

                    <TextField
                        label="Email"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        sx={{ width: "50%", fontFamily: "inherit" }}
                        value={registerData.email} name="email" onChange={handleChange}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        sx={{ width: "50%", fontFamily: "inherit" }}
                        value={registerData.password} name="password" onChange={handleChange}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRegister}
                        sx={{ marginTop: "20px", paddingX: "7vh", fontFamily: "inherit", fontWeight: "bold" }}>
                        Register
                    </Button>
                    <Typography sx={{ fontSize: "1.7vh", marginTop: "2vh", fontFamily: "inherit" }} >
                        Already a user?<span
                            style={{
                                color: "blue", textDecoration: "underline", marginLeft:
                                    "0.5vw", cursor: "pointer"
                            }} onClick={() => navigate("/   ")}>Login</span>
                    </Typography>
                </Box>
            </Box>
        </div>

    )
}

export default Register