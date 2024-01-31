import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationBar = ({ showLoginButton }) => {
  return (
    <AppBar position="static" style={{ marginBottom: "20px" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginRight: "10px" }}
        >
          My Fitness App
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/profile"
          style={{ marginRight: "10px" }}
        >
          Profile
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/recent-sets"
          style={{ marginRight: "10px" }}
        >
          Recent Sets
        </Button>
        <Button color="inherit" component={Link} to="/exercises-profile">
          Exercises Profile
        </Button>
        {showLoginButton && (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
