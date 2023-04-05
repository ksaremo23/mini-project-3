import React, { Fragment, useState } from "react";
import { Routes, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import MiniDrawer from "./components/Drawer";
import "./App.css";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";

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
              <MiniDrawer content={<Dashboard />} />
            ) : (
              <SignIn onSubmit={handleSubmit} />
            )
          }
        />
        <Route
          path="/Dashboard"
          element={<MiniDrawer content={<Dashboard />} />}
        />
        <Route
          path="/Products"
          element={<MiniDrawer content={<Products />} />}
        />
        <Route path="/Orders" element={<MiniDrawer content={<Orders />} />} />
        <Route
          path="/Customers"
          element={<MiniDrawer content={<Customers />} />}
        />
      </Routes>
    </Fragment>
  );
}

export default App;
