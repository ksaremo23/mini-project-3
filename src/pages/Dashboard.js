import React from "react";
import { Container, Stack } from "@mui/material";

import BasicCard from "../components/UI/BasicCard";
import { BASE_API_URL } from "../variable";

function Dashboard() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("/api/dashboard")
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, []);

  const verifyUser = async () => {
    try {
      await fetch(`${BASE_API_URL}/users/isAuth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <Stack spacing={3}>
        <BasicCard title="Total Customers" />
        <BasicCard title="Total Sales" />
        <BasicCard title="Total Products" />
        <button onClick={verifyUser}>Verify User</button>
      </Stack>
    </Container>
  );
}

export default Dashboard;
