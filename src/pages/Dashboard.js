import React, { Fragment } from "react";
import BasicCard from "../components/BasicCard";
import { Stack, Container, Box } from "@mui/material";



const Dashboard = () => {
    
  return (
    <Fragment>
      <Container>
        <Box mt={4}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}>
            <BasicCard title="CUSTOMERS' DATA" data="1000" />
            <BasicCard title="PRODUCTS ON HAND" data="1000" />
            <BasicCard title="TOTAL SALES" data="1000" />
          </Stack>
        </Box>
      </Container>
    </Fragment>
  );
};


export default Dashboard;
