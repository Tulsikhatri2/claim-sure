import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { governmentRequestList } from '../Redux/Slice/dataSlice'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Dashboard, Logout } from '@mui/icons-material'
import AddBoxIcon from '@mui/icons-material/AddBox';


const GovernmentDashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(governmentRequestList())
  }, [])

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Create New Policy", icon: <AddBoxIcon /> },
    { text: "Logout", icon: <Logout /> },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton
            // onClick={() => handleSidebar(item?.text)}
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
    <div>GovernmentDashboard</div>
  )
}

export default GovernmentDashboard