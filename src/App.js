import React, { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import MiniDrawer from "./components/Drawer";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import SignUp from "./pages/SignUp";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    setIsSignedIn(true);
  };

  return (
    /**wraping React.Fragment to avoid unnecessary <div> elements
     * to render in DOM
     */
    <Fragment>
      {/**No need i-render ang <Drawer /> component kasi ito po ay component ni MUI
       * Ang <MiniDrawer /> ang dapat i-render kasi po ito ang ginawang custom component
       * sa Drawer.js
       * Ang <MiniDrawer /> at <SignIn /> component ay dapat i-render sya conditionally
       * Ibig sabihin, sa unang render dapat <SignIn /> component lang ang mkikita
       * Magrerender lang ang <MiniDrawer /> component kung naka sign-in na po ang user */}
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? (
              <MiniDrawer>
                <Dashboard />
              </MiniDrawer>
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
          path="/orders"
          element={
            <MiniDrawer>
              <Orders />
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
      </Routes>
    </Fragment>
  );
}

export default App;
