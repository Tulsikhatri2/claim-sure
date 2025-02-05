import { Dialog, IconButton, Typography, Box, Card, CardMedia, Button, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSurveyorPolicyList, objectDamageData } from '../Redux/Slice/dataSlice';
import toast from 'react-hot-toast';

const BASE_URL = "http://localhost:12000/";
const ViewPolicyDetails = ({ open, handleClose, viewPolicy }) => {
    const [assessment, setAssessment] = useState("")
    const [surveyorComments, setSurveyorComments] = useState("")
    const [damagePercentage, setDamagePercentage] = useState(null)
    const dispatch = useDispatch()

    const handleDamageCalculation = () => {
        const data = {
            id: viewPolicy?.policyId,
            assessment: assessment,
            surveyorComments: surveyorComments
        }
        dispatch(objectDamageData(data))
            .then((res) => {
                console.log(res, "from view page")
                if (res?.payload?.message == "Surveyor review submitted. Awaiting government approval.") {
                    setAssessment("")
                    setSurveyorComments("")
                    dispatch(getSurveyorPolicyList())
                    toast.success("Review submitted to government.!")
                    setDamagePercentage(res?.payload?.surveyorReport?.damagePercentage)
                }
            })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div style={{ paddingBlock: "3vh", paddingInline: "2vh", width: "37vw", position: "relative" }}>

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
                    sx={{ textDecoration: "underline", textAlign: "center", fontSize: "3.5vh" }}
                    color='#6200ea'
                >
                    Policy Details
                </Typography>

                {/* Policy Information */}
                <Box sx={{ display: "flex", flexDirection: "column", marginTop: "1vh", paddingInline: "2vh" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "1.8vh", fontWeight: "800" }}>Policy ID: {viewPolicy?.policyId}</Typography>
                        <Typography sx={{ fontSize: "1.8vh", fontWeight: "800" }}>Insurance Amount: ₹{viewPolicy?.insuranceAmount}</Typography>
                    </div>
                    <Typography sx={{ fontSize: "1.8vh", fontWeight: "800" }}>Description: {viewPolicy?.claimDetails?.damageDescription}</Typography>
                </Box>

                {/* Damage Images */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1vh" }}>
                    <img
                        style={{
                            width: "48%",
                            height: "100%",
                            border: "1px solid black",
                        }}
                        src={`${BASE_URL}${viewPolicy?.beforeDamageImage}`}
                    />
                    <img
                        style={{
                            width: "48%",
                            height: "100%",
                            border: "1px solid black",
                        }}
                        src={`${BASE_URL}${viewPolicy?.claimDetails?.damageImage}`}
                    />
                </Box>
                <Box sx={{ marginTop: "1.5vh" }}>
                    <TextField
                        label="Asessment*"
                        type="text"
                        value={assessment}
                        onChange={(e) => setAssessment(e.target.value)}
                        fullWidth
                        name="assessment"
                        variant="outlined"
                        size='small'
                        disabled={damagePercentage}
                    />
                    <TextField
                        label="Comments*"
                        type="text"
                        value={surveyorComments}
                        onChange={(e) => setSurveyorComments(e.target.value)}
                        fullWidth
                        name="surveyorComments"
                        variant="outlined"
                        size='small'
                        sx={{ marginTop: "1vh" }}
                        disabled={damagePercentage}
                    />
                </Box>
                <Box style={{ marginTop: "2vh" }}>
                    <Button variant='contained' sx={{ fontWeight: "bold" }}
                        onClick={handleDamageCalculation}
                        disabled={damagePercentage}>Calculate Damage Percentage and send to admin</Button>
                    <Typography sx={{ fontWeight: "bold", marginTop: "2vh" }}>Damage Percentage: {damagePercentage}</Typography>
                </Box>

            </div>
        </Dialog>
    );
}

export default ViewPolicyDetails;
