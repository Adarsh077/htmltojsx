import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { WhatsApp, Twitter, Facebook, Instagram } from "@material-ui/icons";

const styles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

function Navbar() {
  const classes = styles();
  return (
    <AppBar position="static" className="shadow">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          HTML TO JSX
        </Typography>
        <IconButton color="inherit">
          <WhatsApp />
        </IconButton>
        <IconButton color="inherit">
          <Twitter />
        </IconButton>
        <IconButton color="inherit">
          <Facebook />
        </IconButton>
        <IconButton color="inherit">
          <Instagram />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
