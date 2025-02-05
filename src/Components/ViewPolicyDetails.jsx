import {
    Dialog,
    IconButton,
    Typography,
    Box,
    Button,
    TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    getSurveyorPolicyList,
    objectDamageData,
} from "../Redux/Slice/dataSlice";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:12000/";

const ViewPolicyDetails = ({ open, handleClose, viewPolicy }) => {
    const [assessment, setAssessment] = useState("");
    const [surveyorComments, setSurveyorComments] = useState("");
    const [damagePercentage, setDamagePercentage] = useState(null);
    const dispatch = useDispatch();

    const handleDamageCalculation = () => {
        const data = {
            id: viewPolicy?.policyId,
            assessment: assessment,
            surveyorComments: surveyorComments,
        };
        dispatch(objectDamageData(data)).then((res) => {
            if (
                res?.payload?.message ===
                "Surveyor review submitted. Awaiting government approval."
            ) {
                setAssessment("");
                setSurveyorComments("");
                dispatch(getSurveyorPolicyList());
                toast.success("Review submitted to government!");
                setDamagePercentage(res?.payload?.surveyorReport?.damagePercentage);
            }
        });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Box
                sx={{
                    paddingBlock: "3vh",
                    paddingInline: { xs: "6vw", sm: "4vh" },
                    width: { xs: "91%", sm: "97%" },
                    position: "relative",
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        color: "#6200ea",
                        "&:hover": { color: "#4500b5" },
                    }}
                >
                    <Close />
                </IconButton>

                <Typography
                    fontWeight={"800"}
                    fontFamily={"inherit"}
                    sx={{
                        textDecoration: "underline",
                        textAlign: "center",
                        fontSize: { xs: "5vh", sm: "3.5vh" },
                    }}
                    color="#6200ea"
                >
                    Policy Details
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "1vh",
                        paddingInline: { xs: "2vw", sm: "2vh" },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: { xs: "column", sm: "row" },
                        }}
                    >
                        <Typography
                            sx={{ fontSize: { xs: "2vh", sm: "1.8vh" }, fontWeight: "800" }}
                        >
                            Policy ID: {viewPolicy?.policyId}
                        </Typography>
                        <Typography
                            sx={{ fontSize: { xs: "2vh", sm: "1.8vh" }, fontWeight: "800" }}
                        >
                            Insurance Amount: ₹{viewPolicy?.insuranceAmount}
                        </Typography>
                    </Box>
                    <Typography
                        sx={{ fontSize: { xs: "2vh", sm: "1.8vh" }, fontWeight: "800" }}
                    >
                        Description: {viewPolicy?.claimDetails?.damageDescription}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "1vh",
                        flexDirection: { xs: "column", sm: "row" },
                    }}
                >
                    <img
                        style={{
                            width: "100%",
                            height: "auto",
                            border: "1px solid black",
                        }}
                        src={`${BASE_URL}${viewPolicy?.beforeDamageImage}`}
                    />
                    <img
                        style={{
                            width: "100%",
                            height: "auto",
                            border: "1px solid black",
                        }}
                        src={`${BASE_URL}${viewPolicy?.claimDetails?.damageImage}`}
                    />
                </Box>

                <Box sx={{ marginTop: "1.5vh" }}>
                    <TextField
                        label="Assessment*"
                        type="text"
                        value={assessment}
                        onChange={(e) => setAssessment(e.target.value)}
                        fullWidth
                        name="assessment"
                        variant="outlined"
                        size="small"
                        disabled={damagePercentage}
                        sx={{ marginBottom: "1vh" }}
                    />
                    <TextField
                        label="Comments*"
                        type="text"
                        value={surveyorComments}
                        onChange={(e) => setSurveyorComments(e.target.value)}
                        fullWidth
                        name="surveyorComments"
                        variant="outlined"
                        size="small"
                        disabled={damagePercentage}
                        sx={{ marginTop: "1vh" }}
                    />
                </Box>

                <Box sx={{ marginTop: "2vh" }}>
                    <Button
                        variant="contained"
                        sx={{ fontWeight: "bold" }}
                        onClick={handleDamageCalculation}
                        disabled={damagePercentage}
                    >
                        Calculate Damage Percentage and send to admin
                    </Button>
                    <Typography sx={{ fontWeight: "bold", marginTop: "2vh" }}>
                        Damage Percentage: {damagePercentage ? `${damagePercentage}%` : null}
                    </Typography>
                </Box>
            </Box>
        </Dialog>
    );
};

export default ViewPolicyDetails;
