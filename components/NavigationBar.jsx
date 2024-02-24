import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "next/link";

const NavigationBar = () => {
  return (
    <AppBar position="static" style={{ marginBottom: "20px" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginRight: "10px" }}
        >
          SET LOGGER
        </Typography>
        <Button
          color="inherit"
          component={Link}
          href="/ProfilePage"
          style={{ marginRight: "10px" }}
        >
          Profile
        </Button>
        <Button color="inherit" component={Link} href="/ExercisesPage">
          Exercises
        </Button>

        <Button color="inherit" component={Link} href="/AddSetPage">
          Add Set
        </Button>
        <Button
          color="inherit"
          component={Link}
          href="/YourSetsPage"
          style={{ marginRight: "10px" }}
        >
          Your Sets
        </Button>
        <Button
          color="inherit"
          onClick={() => {
            sessionStorage.removeItem("token");
          }}
          component={Link}
          href="/LoginPage"
        >
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
