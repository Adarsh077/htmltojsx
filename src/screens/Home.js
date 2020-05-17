import React, { Component } from "react";
import { Paper, Grid, Snackbar, Button } from "@material-ui/core";
import prettier from "prettier/standalone";
import babelparser from "prettier/parser-babel";
import htmlparser from "prettier/parser-html";
import HTMLtoJSX from "htmltojsx";
import HTML from "./HTML";
import JSX from "./JSX";

const prettierOptions = {
  parser: "babel",
  plugins: [babelparser],
  tabWidth: 2,
};

const prettierHTMLOptions = {
  parser: "html",
  plugins: [htmlparser],
  tabWidth: 2,
};

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

  formatCode = (jsx) => {
    try {
      const formattedJSX = prettier.format(jsx, prettierOptions);
      return formattedJSX;
    } catch (e) {
      return e.message;
    }
  };

  convertCode = (html, error) => {
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
      output = this.formatCode(output);
      if (output.indexOf("Unexpected token") > -1) {
        return this.prettify(html);
      }
    }

    const shouldCopy = localStorage.getItem("copyChange") === "true";
    if (shouldCopy) this.copyCode(output);

    return this.setState({ code: output });
  };

  prettify = (html) => {
    try {
      const formattedHTML = prettier.format(html, prettierHTMLOptions);
      return formattedHTML;
    } catch (e) {
      this.convertCode(e.message, true);
    }
  };

  copyTextToClipboard = (text) => {
    var textArea = document.createElement("textarea");

    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = 0;
    textArea.style.opacity = 0;
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const isSuccessful = document.execCommand("copy");
      return isSuccessful;
    } catch (err) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  };

  copyCode = (text) => {
    text = text ? text : this.state.code;
    const isCopied = this.copyTextToClipboard(text);
    if (!localStorage.getItem("snackbarShowed")) {
      this.setState({ showSnackbar: true });
    }
    return isCopied;
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
