import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackBar = (props) => {
  return (
    <Snackbar
      open
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={props.onClose}
      autoHideDuration={6000}
    >
      <Alert {...props.alertMsg} onClose={props.alertOnClose} />
    </Snackbar>
  );
};

export default SnackBar;
