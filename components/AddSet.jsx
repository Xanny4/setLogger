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
} from "@mui/material";

import axios from "axios";

const AddSet = () => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseOptions, setExerciseOptions] = useState([]);

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
    try {
      const response = await axios.post("http://localhost:3000/api/exercises/");
      setExerciseOptions(response.data);
    } catch (error) {
      console.error("Error posting set data:", error);
    }
    console.log("Adding set:", { reps, weight, selectedExercise });
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
                required={true}
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
            required={true}
          />
          <TextField
            label="Weight (kg)"
            type="number"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            margin="normal"
            variant="outlined"
            required={false}
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
        </form>
      </Paper>
    </Container>
  );
};

export default AddSet;
