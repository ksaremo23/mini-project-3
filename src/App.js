import "./App.css";
import MiniDrawer from "./pages/Drawer";
import React, { Fragment, useState } from "react";
import SignIn from "./pages/SignIn";

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
      {isSignedIn ? <MiniDrawer /> : <SignIn onSubmit={handleSubmit} />}
    </Fragment>
  );
}

export default App;
