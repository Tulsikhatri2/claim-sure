import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import { Menu, Dashboard, Logout } from "@mui/icons-material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from "react-router-dom";
import CreatePolicy from "../Components/CreatePolicy";
import ClaimPolicy from "../Components/ClaimPolicy";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerPolicyListData } from "../Redux/Slice/dataSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 265;

const CustomerDashboard = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [createPolicyPopup, setCreatePolicyPopup] = useState(false)
    const [claimPolicyPopup, setClaimPolicyPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { customerPolicyList } = useSelector(state => state.data)
    const { loginData } = useSelector(state => state.auth)
    console.log(customerPolicyList, "customerPolicyList")



    useEffect(() => {
        dispatch(getCustomerPolicyListData())
    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSidebar = (data) => {
        if (data == "Create New Policy") {
            setCreatePolicyPopup(true)
        }
        else if (data == "Logout") {
            localStorage.clear()
            navigate("/")
        }
    }

    const handleClose = () => {
        setCreatePolicyPopup(false)
    }

    const handleClaimPolicyOpen = () => {
        setClaimPolicyPopup(true)
    }

    const handleClaimPolicyClose = () => {
        setClaimPolicyPopup(false)
    }

    const handleClaimPolicy = () => {

    }

    const menuItems = [
        { text: "Dashboard", icon: <Dashboard /> },
        { text: "Create New Policy", icon: <AddBoxIcon /> },
        { text: "Logout", icon: <Logout /> },
    ];

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <div style={{ width: "100%", height: "14vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#E8E6E4" }}>
                <div style={{ fontSize: "2.5vh" }}><AccountCircleIcon /></div>
                <div style={{ color: "maroon", fontWeight: "bold" }}>{loginData?.name}</div>
                <div style={{ fontSize: "2vh", fontWeight: "bold" }}>{loginData?.email}</div>
            </div>
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemButton onClick={() => handleSidebar(item?.text)}>
                            <ListItemIcon sx={{ color: item.text === "Logout" ? "maroon" : "", }}>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography
                                        sx={{
                                            color: item.text === "Logout" ? "maroon" : "",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {item.text}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: "none" } }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap fontWeight={"800"}>
                        Customer Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
                    display: { xs: "none", md: "block" },
                }}
                open>
                {drawer}
            </Drawer>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { width: drawerWidth },
                }}
                ModalProps={{ keepMounted: true }}
            >
                {drawer}
            </Drawer>

            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {customerPolicyList.length == 0 ?
                    <div style={{
                        height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",

                    }}>
                        <p style={{
                            backgroundColor: "#CCE8EF", paddingInline: "2vw", paddingBlock: "2vh", fontSize: "2.5vh", fontWeight: "bold",
                            border: "2px solid #2EB0D1", borderRadius: "5vh"
                        }}>
                            No policies created yet
                        </p>
                        <Button variant="contained" onClick={() => handleSidebar("Create New Policy")}>
                            Create Policy
                        </Button>
                    </div> :
                    <Box
                        sx={{
                            width: "100%",
                            height: "85vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "10px"
                        }}>
                        <Typography variant="h4" gutterBottom
                            sx={{ fontWeight: "bold" }}>
                            Your Policies
                        </Typography>
                        <Box sx={{
                            width: "90%",
                        }}>
                            <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                fontFamily: "Quicksand, sans-serif",
                                marginTop: "20px"
                            }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left", fontWeight: "900" }}>
                                        <th style={{ width: "8vw", padding: "10px", color: "blue", textAlign: "center" }}>Policy ID</th>
                                        <th style={{ width: "35vw", padding: "10px", color: "blue", textAlign: "center" }}>Asset</th>
                                        <th style={{ width: "8vw", textAlign: "center", color: "blue", textAlign: "center" }}>Status</th>
                                        <th style={{ width: "8vw", textAlign: "center", color: "blue", textAlign: "center" }}>Date</th>
                                        <th style={{ width: "10vw", textAlign: "center", color: "blue", textAlign: "center" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerPolicyList?.map((policy, index) => (
                                        <tr key={index} style={{ borderBottom: "1px solid #E0E0E0" }}>
                                            <td style={{ padding: "10px", fontWeight: "800", textAlign: "center" }}>{policy.policyId}</td>
                                            <td style={{ padding: "10px", fontWeight: "bold", textAlign: "center" }}>{policy.type.toUpperCase()}</td>
                                            <td style={{ textAlign: "center" }}>
                                                <p style={{
                                                    paddingBlock: "3px",
                                                    paddingInline: "10px",
                                                    borderRadius: "2vh",
                                                    border: `${policy.policyStatus == "active" ? "1px solid green" :
                                                        policy.policyStatus == "fulfilled" ? "1px solid blue" :
                                                            policy.policyStatus == "rejected" ? "1px solid red" : policy.policyStatus == "under review" ? "1px solid #E0952B" : "1px solid #9C9C9C"}`,
                                                    fontSize: "1.5vh",
                                                    fontWeight: "bold",
                                                    color: `${policy.policyStatus == "active" ? "green" :
                                                        policy.policyStatus == "fulfilled" ? "blue" :
                                                            policy.policyStatus == "rejected" ? "red" : policy.policyStatus == "under review" ? "#E0952B" : "#9C9C9C"}`,
                                                    width: "100%",
                                                    textAlign: "center"
                                                }}>
                                                    {policy.policyStatus.toUpperCase()}
                                                </p>
                                            </td>
                                            <td style={{ textAlign: "center", padding: "10px", color: "#9C9C9C", fontSize: "1.8vh", fontWeight: "bold" }}>
                                                {/* {policy.date} */}
                                                17/03/2024
                                            </td>
                                            <td style={{ padding: "10px", textAlign: "center" }}>
                                                <Button variant="contained" sx={{ fontWeight: "bold", fontSize: "1.5vh" }}
                                                    disabled={policy.policyStatus !== "active"}
                                                    onClick={handleClaimPolicyOpen}>Claim Policy</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Box>
                    </Box>
                }

                <Typography variant="body1">
                </Typography>
            </Box>
            <CreatePolicy open={createPolicyPopup} handleClose={handleClose} />
            <ClaimPolicy open={claimPolicyPopup} handleClose={handleClaimPolicyClose} />
        </Box >
    );
}

export default CustomerDashboard
