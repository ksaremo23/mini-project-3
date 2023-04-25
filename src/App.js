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

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    localStorage.setItem("user", {
      email: data.get("email"),
      password: data.get("password"),
    });
    setIsSignedIn(true);
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
              <SignIn onSubmit={handleSubmit} />
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
