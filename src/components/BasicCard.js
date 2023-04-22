import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const BasicCard = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h4"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          {props.title}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.data}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BasicCard;
