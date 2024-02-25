import React, { useState, useEffect } from "react";
import { getSets, getExercises, deleteSet } from "../utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
  TextField,
  Pagination,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SetsTable = ({ exercise = "" }) => {
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [exercisesData, setExercisesData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const DeleteButton = ({ set }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = async () => {
      const res = await deleteSet(set);
      setConfirmDelete(true);
      setOpen(false);
    };

    return (
      <>
        <Button onClick={handleOpen}>Delete</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Set?</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Are you sure you want to delete this set?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const exercises = await getExercises();
      setExercisesData(exercises);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchSets();
    setConfirmDelete(false);
  }, [
    exercise,
    sortCriteria,
    sortOrder,
    startDate,
    endDate,
    page,
    confirmDelete,
  ]);

  const findExerciseById = (exerciseId) => {
    return exercisesData.find((exercise) => exercise?._id === exerciseId);
  };

  useEffect(() => {
    setSelectedExercise(findExerciseById(exercise));
  });
  const fetchSets = async () => {
    setLoading(true);
    try {
      const { sets, totalPages } = await getSets(
        exercise,
        startDate,
        endDate,
        sortCriteria,
        sortOrder,
        page
      );
      setSets(sets);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching sets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortCriteria(criteria);
      setSortOrder("desc");
    }
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const renderSortableHeader = (label, criteria) => {
    const isSorting = sortCriteria === criteria;
    const arrowIcon = isSorting ? (
      sortOrder === "asc" ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      )
    ) : null;

    return (
      <TableCell
        align="center"
        style={{ cursor: "pointer" }}
        onClick={() => handleSort(criteria)}
      >
        <Typography variant="subtitle1">
          {label} {arrowIcon}
        </Typography>
      </TableCell>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {selectedExercise && (
        <div>
          <Typography variant="h5" style={{ marginBottom: "10px" }}>
            {selectedExercise.name}
          </Typography>
          {selectedExercise.imageURL && (
            <img
              src={selectedExercise.imageURL}
              alt={selectedExercise.name}
              style={{ maxWidth: "200px" }}
            />
          )}
        </div>
      )}
      <Paper style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginRight: "10px" }}
          />
        </div>
      </Paper>
      <div style={{ marginTop: "20px", overflowX: "auto" }}>
        <TableContainer component={Paper}>
          {loading ? (
            <CircularProgress style={{ margin: "20px auto" }} />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  {!exercise && (
                    <TableCell align="center">
                      <Typography variant="subtitle1">Exercise</Typography>
                    </TableCell>
                  )}
                  {renderSortableHeader("Reps", "reps")}
                  {renderSortableHeader("Weight (kg)", "weight")}
                  {renderSortableHeader("Date", "createdAt")}
                  <TableCell align="center">
                    <Typography variant="subtitle1">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sets.map((set) => {
                  const ex = findExerciseById(set.exercise);
                  return (
                    <TableRow key={set._id}>
                      {!exercise && (
                        <TableCell align="center">
                          <Typography variant="body1">{ex?.name}</Typography>
                          {ex?.imageURL && (
                            <img
                              src={ex?.imageURL}
                              alt={ex?.name}
                              style={{ maxWidth: "100px", marginTop: "10px" }}
                            />
                          )}
                        </TableCell>
                      )}
                      <TableCell align="center">
                        <Typography variant="body1">{set.reps}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">{set.weight}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">
                          {new Date(set.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <DeleteButton set={set._id} deleteSet={deleteSet} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default SetsTable;
