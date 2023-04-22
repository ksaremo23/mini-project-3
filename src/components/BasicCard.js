import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

export default function BasicCard(props) {
  return (
    <Container>
      <Grid>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom>
              <h1>{props.title}</h1>
            </Typography>
            <Typography variant="body2">{props.data}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}
