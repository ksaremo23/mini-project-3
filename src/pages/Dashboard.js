import React from "react";
import { Container, Stack } from "@mui/material";

import BasicCard from "../components/UI/BasicCard";

function Dashboard() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("/api/dashboard")
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  return (
    <Container>
      <Stack spacing={3}>
        <BasicCard title="Total Customers" />
        <BasicCard title="Total Sales" />
        <BasicCard title="Total Products" />
      </Stack>
    </Container>
  );
}

export default Dashboard;
