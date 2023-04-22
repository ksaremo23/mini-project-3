import React, { useState, useEffect } from "react";
import { Container, Stack } from "@mui/material";

import BasicCard from "../components/BasicCard";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Container>
      <Stack spacing={3}>
        <BasicCard title="Total Customers" data={data} />
        <BasicCard title="Total Sales" data={data} />
        <BasicCard title="Total Products" data={data} />
      </Stack>
    </Container>
  );
}

export default Dashboard;
