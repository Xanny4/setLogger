import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    width: "240px",
    height: "320px",
    margin: "10px",
    borderRadius: "10px",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  media: {
    height: "180px",
    objectFit: "cover",
    marginBottom: "-8px",
  },
});

function ExerciseCard({ name, imageUrl, onclick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={onclick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          image={imageUrl}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ExerciseCard;
