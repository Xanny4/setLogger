import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ExerciseCard from "../components/ExerciseCard";
import NavigationBar from "../components/NavigationBar";
import { getExercises, createExercise } from "../utils/api";
import { useRouter } from "next/router";

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [open, setOpen] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseImageURL, setExerciseImageURL] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/LoginPage");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setExercises(await getExercises());
    };

    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleExerciseClick = (exerciseId) => {
    router.push({
      pathname: "/YourSetsPage",
      query: { exercise: exerciseId },
    });
  };

  const handleAddExercise = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateExercise = async () => {
    if (!exerciseName) {
      setIsNameValid(false);
      return;
    }

    const newExercise = await createExercise({
      name: exerciseName,
      imageURL: exerciseImageURL,
    });

    setExercises([...exercises, newExercise.Exercise]);
    setOpen(false);
    setExerciseName("");
    setExerciseImageURL("");
    setIsNameValid(true);
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Box display="flex" justifyContent="center" mb={2}>
          <Box style={{ flexBasis: "60px", flexShrink: 0, height: "55px" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAddExercise}
              style={{
                width: "100%",
                height: "100%",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              +
            </Button>
          </Box>
          <Box ml={1}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              style={{ height: "100%" }}
            />
          </Box>
        </Box>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise._id}
              exerciseId={exercise._id}
              name={exercise.name}
              imageUrl={exercise.imageURL}
              onclick={() => handleExerciseClick(exercise._id)}
            />
          ))}
        </Box>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Exercise</DialogTitle>
        <br />
        <DialogContent>
          <TextField
            label="Exercise Name"
            variant="outlined"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            fullWidth
            required
            error={!isNameValid}
            helperText={!isNameValid && "Name must be filled"}
          />
          <Box m={1} />
          <TextField
            label="Image URL"
            variant="outlined"
            value={exerciseImageURL}
            onChange={(e) => setExerciseImageURL(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateExercise} color="primary">
            Create Exercise
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExercisesPage;
