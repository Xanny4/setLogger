import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";

const SetsTable = ({ sets }) => {
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = async (criteria) => {
    try {
      // Make an API call to your backend with the sorting criteria
      const response = await fetch(
        `/api/sort?criteria=${criteria}&order=${sortOrder}`
      );
      const sortedSets = await response.json();

      setSortCriteria(criteria);
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      // Update your component state with the sorted data received from the API
      // setSets(sortedSets); // Uncomment this line if you want to update the component state with the sorted data
    } catch (error) {
      console.error("Error sorting sets:", error);
    }
  };

  const renderSortableHeader = (label, criteria) => {
    const isSorting = sortCriteria === criteria;
    const arrowIcon = isSorting ? (sortOrder === "asc" ? "▲" : "▼") : "";

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
      <TableContainer
        component={Paper}
        style={{ width: "80%", margin: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {renderSortableHeader("Reps", "reps")}
              {renderSortableHeader("Weight (kg)", "weight")}
              {renderSortableHeader("Date", "date")}
            </TableRow>
          </TableHead>
          <TableBody>
            {sets.map((set) => (
              <TableRow key={set._id}>
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
      </TableContainer>
    </div>
  );
};

export default SetsTable;
