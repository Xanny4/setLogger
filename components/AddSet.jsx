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
      try {
        const response = await axios.get(
          "http://localhost:3000/api/exercises/"
        );
        setExerciseOptions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddSet = async () => {
    if (!sessionStorage.getItem("token")) {
      router.push("/LoginPage"); // Redirect to login if not authenticated
      return;
    }

    // Reset errorFields
    setErrorFields([]);

    // Check for required fields
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
        setSuccessMessageOpacity(1); // Set initial opacity for transition

        setTimeout(() => {
          setSuccessMessageOpacity(0); // Fade out after 3 seconds
        }, 3000);

        // Reset errorFields after successful submission
        setErrorFields([]);
      }
    } catch (error) {
      if (error.response.status === 401) {
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
            getOptionLabel={(option) => option.exerciseDetails.name}
            value={selectedExercise}
            onChange={(_, newValue) => setSelectedExercise(newValue)}
            renderOption={(props, option) => (
              <li
                {...props}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Avatar
                  src={option.exerciseDetails.imageURL}
                  alt={option.exerciseDetails.name}
                  sx={{ width: "10%", height: "10%", borderRadius: "8px" }}
                />
                <span>{option.exerciseDetails.name}</span>
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
                          src={selectedExercise.exerciseDetails.imageURL}
                          alt={selectedExercise.exerciseDetails.name}
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
            helperText="Optional" // Add a helper text
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
                opacity: successMessageOpacity, // Dynamic opacity
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
