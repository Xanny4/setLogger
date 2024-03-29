import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Autocomplete,
  InputAdornment,
  Avatar,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useRouter } from "next/router";
import { getExercises } from "../utils/api";
const AddSet = () => {
  const router = useRouter();
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessageOpacity, setSuccessMessageOpacity] = useState(0);
  const [errorFields, setErrorFields] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setExerciseOptions(await getExercises());
    };

    fetchData();
  }, []);

  const handleAddSet = async () => {
    if (!sessionStorage.getItem("token")) {
      router.push("/LoginPage");
      return;
    }

    setErrorFields([]);

    const requiredFields = [];
    if (!selectedExercise) {
      requiredFields.push("Exercise");
    }
    if (!reps) {
      requiredFields.push("Reps");
    }

    if (requiredFields.length > 0) {
      setErrorFields(requiredFields);
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/sets/",
        {
          exercise: selectedExercise?._id,
          reps,
          weight,
        },
        {
          headers: {
            authorization: sessionStorage.getItem("token"),
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Set added successfully!");
        setShowSuccessMessage(true);
        setSuccessMessageOpacity(1);

        setTimeout(() => {
          setSuccessMessageOpacity(0);
        }, 3000);

        setErrorFields([]);
      }
    } catch (error) {
      if (error.response.status === 401) {
        if (sessionStorage.getItem("token")) sessionStorage.removeItem("token");
        router.push("/LoginPage");
        return;
      }
      console.error("Error posting set data:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Set
        </Typography>
        <form>
          <Autocomplete
            options={exerciseOptions}
            getOptionLabel={(option) => option.name}
            value={selectedExercise}
            onChange={(_, newValue) => setSelectedExercise(newValue)}
            renderOption={(props, option) => (
              <li
                {...props}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Avatar
                  src={option.imageURL}
                  alt={option.name}
                  sx={{ width: "10%", height: "10%", borderRadius: "8px" }}
                />
                <span>{option.name}</span>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Exercise"
                fullWidth
                margin="normal"
                variant="outlined"
                required
                error={errorFields.includes("Exercise")}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      {selectedExercise && (
                        <Avatar
                          src={selectedExercise.imageURL}
                          alt={selectedExercise.name}
                          sx={{ width: 24, height: 24, borderRadius: "4px" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <TextField
            label="Reps"
            type="number"
            fullWidth
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            margin="normal"
            variant="outlined"
            required
            error={errorFields.includes("Reps")}
          />
          <TextField
            label="Weight (kg)"
            type="number"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            margin="normal"
            variant="outlined"
            helperText="Optional"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSet}
            style={{ marginTop: "10px" }}
          >
            Add Set
          </Button>
          {showSuccessMessage && (
            <Typography
              variant="body1"
              style={{
                color: "green",
                marginBottom: "5px",
                opacity: successMessageOpacity,
                transition: "opacity 1s ease-out",
              }}
              align="center"
            >
              {successMessage}
            </Typography>
          )}
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity="error"
          >
            Please fill in all required fields.
          </MuiAlert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default AddSet;
