import React, { useState } from "react";
import {
    Typography,
    TextField,
    Button,
    Box,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import loginImage from "../Assets/login-image.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux"
import { customerLoginResponse, governmentLoginResponse, surveyorLoginResponse } from "../Redux/Slice/authSlice";

const AuthenticationPage = () => {
    const [userType, setUserType] = useState("customer");
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (event, newUserType) => {
        if (newUserType !== null) {
            setUserType(newUserType);
            setCredentials({ email: "", password: "" });
        }
    };

    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        if (userType == "customer") {
            if (credentials.email && credentials.password) {
                dispatch(customerLoginResponse({
                    email: credentials.email,
                    password: credentials.password
                }))
                    .then((res) => {
                        console.log(res, "login data")
                        if (res?.payload?.message == "Login successful") {
                            navigate("/customer-dashboard")
                        } else {
                            toast.error("User not found! Register yourself to login.")
                        }
                    })
                setCredentials({ email: "", password: "" })
            }
            else {
                toast.error("Credentials needed")
            }
        } else if (userType == "surveyor") {
            if (credentials.email && credentials.password) {
                dispatch(surveyorLoginResponse({
                    email: credentials.email,
                    password: credentials.password
                }))
                    .then((res) => {
                        console.log(res, "login data")
                        if (res?.payload?.message == "Login successful") {
                            navigate("/surveyor-dashboard")
                        }
                    })
                setCredentials({ email: "", password: "" })
            }
            else {
                toast.error("Credentials needed")
            }
        } else {
            if (credentials.email && credentials.password) {
                dispatch(governmentLoginResponse({
                    email: credentials.email,
                    password: credentials.password
                }))
                    .then((res) => {
                        console.log(res, "login data")
                        if (res?.payload?.message == "Login successful") {
                            navigate("/government-dashboard")
                        }
                    })
                setCredentials({ email: "", password: "" })
            }
            else {
                toast.error("Credentials needed")
            }
        }
    };

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
                    backgroundImage: `url(${loginImage})`,
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
                        Login
                    </Typography>

                    <ToggleButtonGroup
                        value={userType}
                        exclusive
                        onChange={handleChange}
                        sx={{ marginBottom: "20px" }}
                    >
                        <ToggleButton
                            value="customer"
                            sx={{
                                "&.Mui-selected": { backgroundColor: "primary.main", color: "white" },
                                "&.Mui-selected:hover": { backgroundColor: "primary.dark" },
                                borderRadius: "2vh", paddingX: "1.5vw", fontWeight: "bold", fontFamily: "inherit"
                            }}
                        >
                            Customer
                        </ToggleButton>

                        <ToggleButton
                            value="surveyor"
                            sx={{
                                "&.Mui-selected": { backgroundColor: "primary.main", color: "white" },
                                "&.Mui-selected:hover": { backgroundColor: "primary.dark" },
                                borderRadius: "2vh", paddingX: "1.5vw", fontWeight: "bold", fontFamily: "inherit"
                            }}
                        >
                            Surveyor
                        </ToggleButton>

                        <ToggleButton
                            value="government"
                            sx={{
                                "&.Mui-selected": { backgroundColor: "primary.main", color: "white" },
                                "&.Mui-selected:hover": { backgroundColor: "primary.dark" },
                                borderRadius: "2vh", paddingX: "1.5vw", fontWeight: "bold", fontFamily: "inherit"
                            }}
                        >
                            Government
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name="email"
                        sx={{ width: "50%", fontFamily: "inherit" }}
                        value={credentials.email}
                        onChange={handleInputChange}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        name="password"
                        sx={{ width: "50%", fontFamily: "inherit" }}
                        value={credentials.password}
                        onChange={handleInputChange}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        sx={{ marginTop: "20px", paddingX: "7vh", fontFamily: "inherit", fontWeight: "bold" }}>
                        Login
                    </Button>
                    <Typography sx={{ fontSize: "1.7vh", marginTop: "2vh", fontFamily: "inherit" }} >
                        Not a user?<span
                            style={{
                                color: "blue", textDecoration: "underline", marginLeft:
                                    "0.5vw", cursor: "pointer"
                            }} onClick={() => navigate("/register")}>Register</span>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
};

export default AuthenticationPage;
