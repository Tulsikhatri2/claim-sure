// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   governmentAcceptAction,
//   governmentRequestList,
// } from "../Redux/Slice/dataSlice";
// import {
//   AppBar,
//   Box,
//   Button,
//   CssBaseline,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { Menu, Dashboard, Logout } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import PollIcon from "@mui/icons-material/Poll";
// import toast from "react-hot-toast";

// const drawerWidth = 265;

// const GovernmentDashboard = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { governmentRequestedList } = useSelector((state) => state.data);
//   // const { loginData } = useSelector(state => state.auth)
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(governmentRequestList());
//   }, []);

//   console.log(governmentRequestedList, "from dashboard");

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const menuItems = [
//     { text: "Dashboard", icon: <Dashboard /> },
//     { text: "Serveyor Requests", icon: <PollIcon /> },
//     { text: "Logout", icon: <Logout /> },
//   ];

//   const handleSidebar = (data) => {
//     if (data == "Logout") {
//       localStorage.clear();
//       navigate("/");
//     }
//   };

//   const handleGovernmentAcceptance = (data) => {
//     dispatch(governmentAcceptAction(data)).then((res) => {
//       console.log(res, "acceptance");
//       if (res?.payload?.message == "Policy approved successfully") {
//         dispatch(governmentRequestList());
//         toast.success("Policy approved successfully");
//       }
//     });
//   };

//   const drawer = (
//     <div>
//       <Toolbar />
//       <Divider />
//       <div
//         style={{
//           width: "100%",
//           height: "10vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: "#E8E6E4",
//         }}
//       >
//         <div style={{ fontSize: "2.5vh" }}>
//           <AccountCircleIcon />
//         </div>
//         <div style={{ color: "maroon", fontWeight: "bold" }}>Admin</div>
//       </div>
//       <List>
//         {menuItems.map((item, index) => (
//           <ListItem key={index}>
//             <ListItemButton onClick={() => handleSidebar(item?.text)}>
//               <ListItemIcon
//                 sx={{ color: item.text === "Logout" ? "maroon" : "" }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText
//                 primary={
//                   <Typography
//                     sx={{
//                       color: item.text === "Logout" ? "maroon" : "",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {item.text}
//                   </Typography>
//                 }
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: 1201 }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { md: "none" } }}
//           >
//             <Menu />
//           </IconButton>
//           <Typography variant="h6" noWrap fontWeight={"800"}>
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//           display: { xs: "none", md: "block" },
//         }}
//         open
//       >
//         {drawer}
//       </Drawer>

//       <Drawer
//         variant="temporary"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         sx={{
//           display: { xs: "block", md: "none" },
//           "& .MuiDrawer-paper": { width: drawerWidth },
//         }}
//         ModalProps={{ keepMounted: true }}
//       >
//         {drawer}
//       </Drawer>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         <Toolbar />
//         <Box
//           sx={{
//             width: "100%",
//             height: "85vh",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             padding: "10px",
//           }}
//         >
//           <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//             Policy Requests
//           </Typography>
//           <Box
//             sx={{
//               width: "90%",
//             }}
//           >
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 fontFamily: "Quicksand, sans-serif",
//                 marginTop: "20px",
//               }}
//             >
//               <thead>
//                 <tr
//                   style={{
//                     backgroundColor: "#f5f5f5",
//                     textAlign: "left",
//                     fontWeight: "900",
//                   }}
//                 >
//                   <th
//                     style={{
//                       width: "8vw",
//                       padding: "10px",
//                       color: "blue",
//                       textAlign: "center",
//                     }}
//                   >
//                     Customer ID
//                   </th>
//                   <th
//                     style={{
//                       width: "10vw",
//                       padding: "10px",
//                       color: "blue",
//                       textAlign: "center",
//                     }}
//                   >
//                     Asset
//                   </th>
//                   <th
//                     style={{
//                       width: "10vw",
//                       padding: "10px",
//                       color: "blue",
//                       textAlign: "center",
//                     }}
//                   >
//                     Insurance Amount
//                   </th>
//                   <th
//                     style={{
//                       width: "6vw",
//                       textAlign: "center",
//                       color: "blue",
//                       textAlign: "center",
//                     }}
//                   >
//                     Status
//                   </th>
//                   <th
//                     style={{
//                       width: "6vw",
//                       textAlign: "center",
//                       color: "blue",
//                       textAlign: "center",
//                     }}
//                   >
//                     Date
//                   </th>
//                   <th
//                     style={{
//                       width: "17vw",
//                       textAlign: "center",
//                       color: "blue",
//                       textAlign: "center",
//                     }}
//                   >
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {governmentRequestedList?.map((item) => {
//                   const date = item.createdAt;
//                   const formattedDate = new Date(date).toLocaleDateString(
//                     "en-GB",
//                     {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "2-digit",
//                     }
//                   );
//                   return (
//                     <tr
//                       style={{
//                         borderBottom: "1px solid #E0E0E0",
//                         fontWeight: "800",
//                       }}
//                     >
//                       <td style={{ textAlign: "center", padding: "10px" }}>
//                         {item?.customerId}
//                       </td>
//                       <td style={{ textAlign: "center", padding: "10px" }}>
//                         {item?.type?.toUpperCase()}
//                       </td>
//                       <td style={{ textAlign: "center", padding: "10px" }}>
//                         {item?.insuranceAmount}
//                       </td>
//                       <td style={{ textAlign: "center", padding: "10px" }}>
//                         <p
//                           style={{
//                             paddingBlock: "3px",
//                             paddingInline: "10px",
//                             borderRadius: "2vh",
//                             border: `${
//                               item?.policyStatus == "active"
//                                 ? "1px solid green"
//                                 : item?.policyStatus == "fulfilled"
//                                 ? "1px solid blue"
//                                 : item?.policyStatus == "rejected"
//                                 ? "1px solid red"
//                                 : item?.policyStatus == "under review"
//                                 ? "1px solid #E0952B"
//                                 : "1px solid #9C9C9C"
//                             }`,
//                             fontSize: "1.5vh",
//                             fontWeight: "bold",
//                             color: `${
//                               item?.policyStatus == "active"
//                                 ? "green"
//                                 : item?.policyStatus == "fulfilled"
//                                 ? "blue"
//                                 : item?.policyStatus == "rejected"
//                                 ? "red"
//                                 : item?.policyStatus == "under review"
//                                 ? "#E0952B"
//                                 : "#9C9C9C"
//                             }`,
//                             width: "100%",
//                             textAlign: "center",
//                           }}
//                         >
//                           {item?.policyStatus?.toUpperCase()}
//                         </p>
//                       </td>
//                       <td style={{ textAlign: "center", padding: "10px" }}>
//                         {formattedDate}
//                       </td>
//                       <td
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           paddingInline: "1vw",
//                           padding: "10px",
//                         }}
//                       >
//                         <Button
//                           variant="contained"
//                           sx={{ fontWeight: "bold", fontSize: "1.5vh" }}
//                           onClick={() => {
//                             const payload = {
//                               id: item?.policyId,
//                               action: "approve",
//                             };
//                             handleGovernmentAcceptance(payload);
//                           }}
//                           disabled={item.policyStatus != "pending"}
//                         >
//                           Accept Request
//                         </Button>
//                         <Button
//                           variant="contained"
//                           color="error"
//                           disabled={item.policyStatus != "pending"}
//                           sx={{ fontWeight: "bold", fontSize: "1.5vh" }}
//                         >
//                           Reject Request
//                         </Button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </Box>
//         </Box>
//         <Typography variant="body1"></Typography>
//       </Box>
//     </Box>
//   );
// };

// export default GovernmentDashboard;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  governmentAcceptAction,
  governmentRequestList,
} from "../Redux/Slice/dataSlice";
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
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PollIcon from "@mui/icons-material/Poll";
import toast from "react-hot-toast";

const drawerWidth = 265;

const GovernmentDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { governmentRequestedList } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(governmentRequestList());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Surveyor Requests", icon: <PollIcon /> },
    { text: "Logout", icon: <Logout /> },
  ];

  const handleSidebar = (data) => {
    if (data === "Logout") {
      localStorage.clear();
      navigate("/");
    }
  };

  const handleGovernmentAcceptance = (data) => {
    dispatch(governmentAcceptAction(data)).then((res) => {
      if (res?.payload?.message === "Policy approved successfully") {
        dispatch(governmentRequestList());
        toast.success("Policy approved successfully");
      }
    });
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <div
        style={{
          width: "100%",
          height: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E8E6E4",
        }}
      >
        <div style={{ fontSize: "2.5vh" }}>
          <AccountCircleIcon />
        </div>
        <div style={{ color: "maroon", fontWeight: "bold" }}>Admin</div>
      </div>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => handleSidebar(item?.text)}>
              <ListItemIcon
                sx={{ color: item.text === "Logout" ? "maroon" : "" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      color: item.text === "Logout" ? "maroon" : "",
                      fontWeight: "bold",
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
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          display: { xs: "none", md: "block" },
        }}
        open
      >
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
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            width: "100%",
            height: "85vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }, // Adjusting font size for different screens
            }}
          >
            Policy Requests
          </Typography>
          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "Quicksand, sans-serif",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f5f5f5",
                    textAlign: "left",
                    fontWeight: "900",
                  }}
                >
                  <th
                    style={{
                      padding: "10px",
                      color: "blue",
                      textAlign: "center",
                      fontSize: "2vw",
                    }}
                  >
                    Customer ID
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      color: "blue",
                      textAlign: "center",
                      fontSize: "2vw",
                    }}
                  >
                    Asset
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      color: "blue",
                      fontSize: "2vw",
                    }}
                  >
                    Insurance Amount
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      color: "blue",
                      fontSize: "2vw",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      color: "blue",
                      fontSize: "2vw",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      color: "blue",
                      fontSize: "2vw",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {governmentRequestedList?.map((item) => {
                  const date = item.createdAt;
                  const formattedDate = new Date(date).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    }
                  );
                  return (
                    <tr
                      key={item.policyId}
                      style={{
                        borderBottom: "1px solid #E0E0E0",
                        fontWeight: "800",
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, // Adjusted font size for different screens
                      }}
                    >
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {item?.customerId}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {item?.type?.toUpperCase()}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {item?.insuranceAmount}
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        <p
                          style={{
                            paddingBlock: "3px",
                            paddingInline: "10px",
                            borderRadius: "2vh",
                            border: `${
                              item?.policyStatus === "active"
                                ? "1px solid green"
                                : item?.policyStatus === "fulfilled"
                                ? "1px solid blue"
                                : item?.policyStatus === "rejected"
                                ? "1px solid red"
                                : item?.policyStatus === "under review"
                                ? "1px solid #E0952B"
                                : "1px solid #9C9C9C"
                            }`,
                            fontSize: "1.2vh",
                            fontWeight: "bold",
                            color: `${
                              item?.policyStatus === "active"
                                ? "green"
                                : item?.policyStatus === "fulfilled"
                                ? "blue"
                                : item?.policyStatus === "rejected"
                                ? "red"
                                : item?.policyStatus === "under review"
                                ? "#E0952B"
                                : "#9C9C9C"
                            }`,
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          {item?.policyStatus?.toUpperCase()}
                        </p>
                      </td>
                      <td style={{ textAlign: "center", padding: "10px" }}>
                        {formattedDate}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingInline: "1vw",
                          padding: "10px",
                        }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "1vh", sm: "1.2vh", md: "1.5vh" },
                          }}
                          onClick={() => {
                            const payload = {
                              id: item?.policyId,
                              action: "approve",
                            };
                            handleGovernmentAcceptance(payload);
                          }}
                          disabled={item.policyStatus !== "pending"}
                        >
                          Accept Request
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          disabled={item.policyStatus !== "pending"}
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "1vh", sm: "1.2vh", md: "1.5vh" },
                          }}
                          onClick={() => {
                            const payload = {
                              id: item?.policyId,
                              action: "reject",
                            };
                            handleGovernmentAcceptance(payload);
                          }}
                        >
                          Reject Request
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GovernmentDashboard;
