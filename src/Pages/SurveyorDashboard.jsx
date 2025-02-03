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
import { useDispatch } from "react-redux";
import { getSurveyorPolicyList } from "../Redux/Slice/dataSlice";

const drawerWidth = 265;

const SurveyorDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const policies = [
    { id: "ID123", asset: "Car", status: "Active", date: "25/12/2025" },
    { id: "ID456", asset: "House", status: "Pending Request", date: "10/01/2026" },
    { id: "ID789", asset: "Bike", status: "Fulfilled", date: "05/07/2024" },
    { id: "ID789", asset: "Life", status: "Rejected", date: "05/07/2024" },
  ];

  useEffect(() => {
    dispatch(getSurveyorPolicyList())
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebar = (data) => {
    if (data == "Logout") {
      localStorage.clear()
      navigate("/")
    }
  }

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Logout", icon: <Logout /> },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
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
            Surveyor Dashboard
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
                  <th style={{ width: "8vw", padding: "10px", color: "blue", textAlign: "center" }}>Customer ID</th>
                  <th style={{ width: "10vw", padding: "10px", color: "blue", textAlign: "center" }}>Asset</th>
                  <th style={{ width: "10vw", textAlign: "center", color: "blue" }}>Insurance Amount</th>
                  <th style={{ width: "6vw", textAlign: "center", color: "blue" }}>Status</th>
                  <th style={{ width: "6vw", textAlign: "center", color: "blue" }}>Date</th>
                  <th style={{ width: "10vw", textAlign: "center", color: "blue" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #E0E0E0" }}>
                    <td style={{ padding: "10px", fontWeight: "800", textAlign: "center" }}>{policy.id}</td>
                    <td style={{ padding: "10px", fontWeight: "bold", textAlign: "center" }}>{policy.asset}</td>
                    <td style={{ padding: "10px", fontWeight: "bold", textAlign: "center" }}>Insurance Amount</td>
                    <td>
                      <p style={{
                        paddingBlock: "3px",
                        paddingInline: "10px",
                        borderRadius: "2vh",
                        border: `${policy.status == "Active" ? "1px solid green" :
                          policy.status == "Fulfilled" ? "1px solid blue" :
                            policy.status == "Rejected" ? "1px solid red" : "1px solid #9C9C9C"}`,
                        fontSize: "1.5vh",
                        fontWeight: "bold",
                        color: `${policy.status == "Active" ? "green" :
                          policy.status == "Fulfilled" ? "blue" :
                            policy.status == "Rejected" ? "red" : "#9C9C9C"}`,
                        width: "100%",
                        textAlign: "center"
                      }}>
                        {policy.status}
                      </p>
                    </td>
                    <td style={{ textAlign: "center", padding: "10px", color: "#9C9C9C", fontSize: "1.8vh", fontWeight: "bold" }}>
                      {policy.date}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <Button variant="contained" sx={{ fontWeight: "bold", fontSize: "1.5vh" }}
                      // disabled={policy.status == "Rejected"}
                      >View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
        <Typography variant="body1">
        </Typography>
      </Box>
    </Box >
  );
}

export default SurveyorDashboard
