import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Switch from "@material-ui/core/Switch";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Grid, Box, TextField } from "@material-ui/core";

const localStorage = window.localStorage;

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const getItem = (name) => {
  const value = localStorage.getItem(name);
  if (name === "componentName") return value;
  return value ? JSON.parse(value) : "";
};

export default function Settings(props) {
  const { open, handleClose } = props;
  const [copyChange, setCopyChange] = useState(getItem("copyChange"));
  const [createComponent, setCreateComponent] = useState(
    getItem("createComponent")
  );
  const [componentName, SetComponentName] = useState(getItem("componentName"));

  const handleSave = () => {
    localStorage.setItem("copyChange", copyChange);
    localStorage.setItem("createComponent", createComponent);
    localStorage.setItem("componentName", componentName);
    handleClose();
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle onClose={handleClose}>Settings</DialogTitle>
        <DialogContent dividers>
          <Box px={5}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6}>
                <Typography align="right" variant="body1">
                  Copy on Change
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Switch
                  checked={copyChange}
                  onChange={() => setCopyChange(!copyChange)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6}>
                <Typography align="right" variant="body1">
                  Create class component
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Switch
                  checked={createComponent}
                  onChange={() => setCreateComponent(!createComponent)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={6}>
                <Typography align="right" variant="body1">
                  Component Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Name"
                  value={componentName}
                  onChange={(e) => SetComponentName(e.target.value)}
                  variant="outlined"
                  autoFocus
                  disabled={!createComponent}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
