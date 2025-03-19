import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FaBox, FaShoppingCart, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;



export default function Dashboard({children}) {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Products", icon: <FaBox />, path: "/products" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/orders" },
    { name: "Users", icon: <FaUsers />, path: "/users" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Example: Remove authentication token
    navigate("/admin"); // Redirect to login page
  };

  return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar> */}

        {/* Sidebar Navigation */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
          {menuItems.map((item) =>
            item.isLogout ? (
              <ListItem key={item.name} disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ) : (
              <ListItem key={item.name} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        </Drawer>

        {/* Main Content Area with Routing */}
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
            {children}
        </Box>
      </Box>
  );
}
