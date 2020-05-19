import React, { Component } from "react";
import { withStyles, Container } from "@material-ui/core";
import { AppBar } from "./components";
import Home from "./screens/Home";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: "24px",
  },
});
const localStorage = window.localStorage;

class App extends Component {
  componentDidMount = () =>
    document.querySelector(".loading").setAttribute("style", "display: none");

  render() {
    if (!localStorage.getItem("copyChange")) {
      localStorage.setItem("copyChange", true);
    }
    if (!localStorage.getItem("createComponent")) {
      localStorage.setItem("createComponent", false);
    }
    if (!localStorage.getItem("componentName")) {
      localStorage.setItem("componentName", "");
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar />
        <Container className={classes.container} maxWidth="xl">
          <Home />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
