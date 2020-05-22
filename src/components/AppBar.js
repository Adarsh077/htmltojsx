import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { WhatsApp, Twitter, Facebook } from "@material-ui/icons";

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
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="whatsapp://send?text=https://htmltojsx.ml/"
          data-action="share/whatsapp/share"
        >
          <IconButton color="inherit">
            <WhatsApp />
          </IconButton>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/intent/tweet?text=https://htmltojsx.ml/"
        >
          <IconButton color="inherit">
            <Twitter />
          </IconButton>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/sharer/sharer.php?u=https://htmltojsx.ml"
        >
          <IconButton color="inherit">
            <Facebook />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
