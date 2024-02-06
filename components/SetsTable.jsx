import React, { useState, useEffect } from "react";
import { getSets } from "../utils/api";
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
  IconButton,
  Pagination,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SetsTable = ({ exercise }) => {
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSets();
  }, [exercise, sortCriteria, sortOrder, startDate, endDate, page]);

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
    setSortCriteria(criteria);
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
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
        onClick={() => handleSort(criteria)}
        style={{ cursor: "pointer" }}
      >
        <Typography variant="subtitle1">
          {label} {arrowIcon}
        </Typography>
      </TableCell>
    );
  };

  return (
    <div>
      <Paper style={{ padding: "10px" }}>
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
        <Button
          variant="contained"
          onClick={() => fetchSets()}
          style={{ marginRight: "10px" }}
        >
          Apply Filters
        </Button>
      </Paper>
      <TableContainer
        component={Paper}
        style={{ width: "80%", margin: "auto" }}
      >
        {loading ? (
          <CircularProgress style={{ margin: "20px auto" }} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {exercise ? null : <TableCell>Exercise</TableCell>}
                {renderSortableHeader("Reps", "reps")}
                {renderSortableHeader("Weight (kg)", "weight")}
                {renderSortableHeader("Date", "date")}
              </TableRow>
            </TableHead>
            <TableBody>
              {sets.map((set) => (
                <TableRow key={set._id}>
                  {!exercise && (
                    <TableCell align="center">
                      <Typography variant="body1">{set.exercise}</Typography>
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
                      {new Date(set.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
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
