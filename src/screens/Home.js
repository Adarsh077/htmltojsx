import React, { Component } from "react";
import { Paper, Grid, Snackbar, Button } from "@material-ui/core";
import HTMLtoJSX from "htmltojsx";
import HTML from "./HTML";
import JSX from "./JSX";

const createComponent = (jsx) => {
  const className = localStorage.getItem("componentName");
  return `export default class ${className} extends Component{
      render(){
        ${jsx}
      }
    }
  `;
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      showSnackbar: false,
    };
    this.editorRef = React.createRef();
  }

  handleSnackbarClose = () => {
    this.setState({ showSnackbar: false });
    localStorage.setItem("snackbarShowed", "true");
  };

  convertCode = async (html, error) => {
    if (error) {
      return this.setState({ code: html });
    }

    if (!html.trim()) return this.setState({ code: "" });

    const converter = new HTMLtoJSX({ createClass: false });
    let output = converter.convert(html);

    const shouldCreateComponent =
      localStorage.getItem("createComponent") === "true";
    if (shouldCreateComponent) {
      output = createComponent(output);
      const { prettifyJSX } = await import("../utils/prettifyJSX");
      console.log("Reached");
      output = await prettifyJSX(output);

      if (output.indexOf("Unexpected token") > -1) {
        const { prettify } = await import("../utils/prettifyHTML");
        output = prettify(output);
        if (output.err) output = output.err;
      }
    }

    const shouldCopy = localStorage.getItem("copyChange") === "true";
    if (shouldCopy) await this.copyCode(output);

    return this.setState({ code: output });
  };

  copyCode = async (text) => {
    text = text ? text : this.state.code;
    const { copyTextToClipboard } = await import("../utils/copyText");
    copyTextToClipboard(text);
    if (!localStorage.getItem("snackbarShowed")) {
      this.setState({ showSnackbar: true });
    }
  };

  render() {
    const { code, showSnackbar } = this.state;
    return (
      <div>
        <Paper className="editor shadow">
          <Grid container style={{ height: "100%" }}>
            <Grid item xs={6} className="editor-divider">
              <HTML
                editorRef={this.editorRef}
                convertCode={this.convertCode}
                prettify={this.prettify}
              />
            </Grid>
            <Grid item xs={6}>
              <JSX copyCode={this.copyCode} code={code} />
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={showSnackbar}
            message="JSX is automatically copied after every change."
            action={
              <React.Fragment>
                <Button
                  color="primary"
                  size="small"
                  onClick={this.handleSnackbarClose}
                >
                  Ok
                </Button>
              </React.Fragment>
            }
          />
        </Paper>
      </div>
    );
  }
}

export default Home;
