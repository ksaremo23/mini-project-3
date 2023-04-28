import React, { Fragment, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import MiniDrawer from "./components/layout/MiniDrawer";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import SnackBar from "./components/UI/SnackBar";
import { BASE_API_URL } from "./variable";

const api_url = `${BASE_API_URL}/users/login`;

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = {
      username: data.get("username"),
      password: data.get("password"),
    };

    try {
      await fetch(api_url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsSignedIn(true);
    } catch (error) {
      setSnackbar({
        children: error.message,
        severity: "error",
      });
    }
  };

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route
          path="/sign-in"
          element={
            isSignedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <SignIn
                onSubmit={handleSubmit}
                alert={
                  !!snackbar && (
                    <SnackBar
                      onClose={handleCloseSnackbar}
                      alertMsg={snackbar}
                      alertOnClose={handleCloseSnackbar}
                    />
                  )
                }
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <MiniDrawer>
              <Dashboard />
            </MiniDrawer>
          }
        />
        <Route
          path="/products"
          element={
            <MiniDrawer>
              <Products />
            </MiniDrawer>
          }
        />
        <Route
          path="/sales"
          element={
            <MiniDrawer>
              <Sales />
            </MiniDrawer>
          }
        />
        <Route
          path="/customers"
          element={
            <MiniDrawer>
              <Customers />
            </MiniDrawer>
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
