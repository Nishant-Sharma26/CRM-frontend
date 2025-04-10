import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setToken, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}>
          Candidate Referral
        </Typography>
        {isAuthenticated ? (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              color="inherit"
              onClick={() => navigate("/dashboard")}
              sx={{ textTransform: "none", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/refer")}
              sx={{ textTransform: "none", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
            >
              Refer
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/metrics")}
              sx={{ textTransform: "none", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
            >
              Metrics
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ ml: 2, backgroundColor: "rgba(255,255,255,0.15)", "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" } }}
            >
              Logout
            </Button>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;