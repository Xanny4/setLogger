import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Box,
  FormHelperText,
} from "@mui/material";

import { getUser, modifyUser, confirmPassword } from "../utils/api";

const PersonalDetails = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [originalValues, setOriginalValues] = useState({});
  // const [profilePicture, setProfilePicture] = useState(
  //   "/path/to/profile_picture.jpg"
  // );
  const [changesMade, setChangesMade] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
  });

  //api
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUser();
      setUsername(user.username);
      setEmail(user.email);
    };
    fetchUserData();
  }, []);

  const handleEdit = () => {
    if (editMode) {
      setEditMode(false);
      setNewUsername(originalValues.username);
      setNewEmail(originalValues.email);
      setChangesMade(false);
    } else {
      setEditMode(true);
      setNewUsername(username);
      setNewEmail(email);
      setOriginalValues({ username, email });
      setChangesMade(true);
    }
  };

  const handleSave = () => {
    setOpenEditDialog(true);
  };

  const handleConfirmSave = async () => {
    const passwordConfirmed = await confirmPassword(password);

    if (!passwordConfirmed) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        password: "Password is incorrect",
      }));
      return;
    }

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));

    const response = await modifyUser(newUsername, newEmail);
    if (response.user) {
      setUsername(newUsername);
      setEmail(newEmail);
      setEditMode(false);
      setChangesMade(false);
    } else {
      if (response.errors.username) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          username: "Username is already taken",
        }));
      }
      if (response.errors.email) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          email: "Email is already in use",
        }));
      }
    }

    setOpenEditDialog(false);
    setPassword("");
  };

  // const handleProfilePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfilePicture(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   setChangesMade(true);
  // };

  return (
    <Grid /*container spacing={2}*/>
      {/* <Grid item xs={12} md={4}>
        <Paper
          style={{ padding: "20px", position: "relative", minHeight: 250 }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar
              alt="Profile Picture"
              src={profilePicture}
              sx={{ width: 200, height: 200, cursor: "pointer" }}
            />
            <input
              accept="image/*"
              id="profile-picture-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleProfilePictureChange}
            />
            {editMode && (
              <label htmlFor="profile-picture-input">
                <Button
                  variant="outlined"
                  component="span"
                  style={{ marginTop: 10 }}
                >
                  Change Picture
                </Button>
              </label>
            )}
          </Box>
        </Paper>
      </Grid> */}
      <Grid item xs={12} md={8}>
        <Paper
          style={{ padding: "20px", position: "relative", minHeight: 250 }}
        >
          <Typography variant="h5" gutterBottom>
            Profile Information
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            Username:
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            {editMode ? (
              <TextField
                variant="outlined"
                value={newUsername}
                onChange={(e) => {
                  setNewUsername(e.target.value);
                  setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    username: "",
                  }));
                }}
                error={!!errorMessages.username}
                helperText={errorMessages.username}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <Typography variant="body2" style={{ marginRight: "10px" }}>
                {username}
              </Typography>
            )}
          </div>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            Email:
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            {editMode ? (
              <TextField
                variant="outlined"
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    email: "",
                  }));
                }}
                error={!!errorMessages.email}
                helperText={errorMessages.email}
                style={{ marginRight: "10px" }}
              />
            ) : (
              <Typography variant="body2" style={{ marginRight: "10px" }}>
                {email}
              </Typography>
            )}
          </div>
          <Box
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              display: "flex",
              gap: "10px",
            }}
          >
            {editMode ? (
              <Button onClick={handleEdit}>Cancel</Button>
            ) : (
              <Button onClick={handleEdit}>Edit</Button>
            )}
            {changesMade && <Button onClick={handleSave}>Save Changes</Button>}
          </Box>
        </Paper>
      </Grid>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Confirm Your Password</DialogTitle>
        <br />
        <DialogContent>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errorMessages.password}
            helperText={
              errorMessages.password ? (
                <FormHelperText error>{errorMessages.password}</FormHelperText>
              ) : null
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmSave} disabled={password === ""}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PersonalDetails;
