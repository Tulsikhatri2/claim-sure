import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { governmentRequestList } from '../Redux/Slice/dataSlice'
import { AppBar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Toolbar, Typography } from '@mui/material'
import { Dashboard, Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const drawerWidth = 265;

const GovernmentDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { governmentRequestedList } = useSelector(state => state.data)
  const { loginData } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(governmentRequestList())
  }, [])

  console.log(governmentRequestedList, "from dashboard")

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Logout", icon: <Logout /> },
  ];

  const handleSidebar = (data) => {
    if (data == "Logout") {
      localStorage.clear()
      navigate("/")
    }
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <div style={{ width: "100%", height: "10vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#E8E6E4" }}>
        <div style={{ fontSize: "2.5vh" }}><AccountCircleIcon /></div>
        <div style={{ color: "maroon", fontWeight: "bold" }}>Admin</div>
      </div>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton
              onClick={() => handleSidebar(item?.text)}
            >
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
            Policy Requests
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
                  <th style={{ width: "10vw", padding: "10px", color: "blue", textAlign: "center" }}>Insurance Amount</th>
                  <th style={{ width: "6vw", textAlign: "center", color: "blue", textAlign: "center" }}>Status</th>
                  <th style={{ width: "6vw", textAlign: "center", color: "blue", textAlign: "center" }}>Date</th>
                  <th style={{ width: "17vw", textAlign: "center", color: "blue", textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {governmentRequestedList.map((item) => {
                  const date = item.createdAt
                  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  });

                  console.log(formattedDate, "date");

                  return (
                    <tr style={{ borderBottom: "1px solid #E0E0E0", fontWeight: "800" }}>
                      <td style={{ textAlign: "center", padding: "10px" }}>{item?.customerId}</td>
                      <td style={{ textAlign: "center", padding: "10px" }}>{item?.type.toUpperCase()}</td>
                      <td style={{ textAlign: "center", padding: "10px" }}>{item?.insuranceAmount}</td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <p style={{
                          paddingBlock: "3px",
                          paddingInline: "10px",
                          borderRadius: "2vh",
                          border: `${item?.claimDetails?.status == "active" ? "1px solid green" :
                            item?.claimDetails?.status == "fulfilled" ? "1px solid blue" :
                              item?.claimDetails?.status == "rejected" ? "1px solid red" : item?.claimDetails?.status == "under review" ? "1px solid #E0952B" : "1px solid #9C9C9C"}`,
                          fontSize: "1.5vh",
                          fontWeight: "bold",
                          color: `${item?.claimDetails?.status == "active" ? "green" :
                            item?.claimDetails?.status == "fulfilled" ? "blue" :
                              item?.claimDetails?.status == "rejected" ? "red" : item?.claimDetails?.status == "under review" ? "#E0952B" : "#9C9C9C"}`,
                          width: "100%",
                          textAlign: "center"
                        }}>
                          {item?.claimDetails?.status.toUpperCase()}
                        </p>
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>{formattedDate}</td>
                      <td style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingInline: "1vw", padding: "10px" }}>
                        <Button variant="contained" sx={{ fontWeight: "bold", fontSize: "1.5vh" }}>
                          Accept Request</Button>
                        <Button variant="contained" color='error' sx={{ fontWeight: "bold", fontSize: "1.5vh" }}>
                          Reject Request</Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </Box>
        </Box>
        <Typography variant="body1">
        </Typography>
      </Box>

    </Box >
  )
}

export default GovernmentDashboard