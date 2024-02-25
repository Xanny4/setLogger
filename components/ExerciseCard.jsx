import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

function ExerciseCard({ name, imageUrl, onclick }) {
  return (
    <Card
      sx={{
        width: 240,
        marginTop: 5,
        borderRadius: 10,
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        transition: "transform 0.3s",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
      onClick={onclick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{
            height: 180,
            objectFit: "cover",
            borderRadius: "10px 10px 0px 0px",
          }}
        />
      </CardActionArea>
      <CardContent sx={{ paddingBottom: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ExerciseCard;
