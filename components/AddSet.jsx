import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Autocomplete,
  InputAdornment,
} from "@mui/material";

const AddSet = () => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [exerciseOptions] = useState([
    { id: "1", name: "Exercise A" },
    { id: "2", name: "Exercise B" },
    { id: "3", name: "Exercise C" },
    // Add more exercises as needed
  ]);

  const handleAddSet = () => {
    // Add logic to send the new set data to your backend or update the state in your parent component
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
            getOptionLabel={(option) => option.name}
            value={selectedExercise}
            onChange={(_, newValue) => setSelectedExercise(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Exercise"
                fullWidth
                margin="normal"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* You can add a search icon or any other icon here */}
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
          />
          <TextField
            label="Weight (kg)"
            type="number"
            fullWidth
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            margin="normal"
            variant="outlined"
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
