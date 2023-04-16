import React from "react";

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material/";

const ModalDialog = (props) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.children}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalDialog;
