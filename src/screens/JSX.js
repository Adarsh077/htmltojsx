import React, { Component } from "react";
import { IconButton, Tooltip, Badge } from "@material-ui/core";
import { FileCopyOutlined, GetAppOutlined } from "@material-ui/icons";
import EditorBar from "./components/EditorBar";
import { ControlledEditor as Editor } from "@monaco-editor/react";

const hideBadge = () => !!localStorage.getItem("hideBadge");

export class JSX extends Component {
  constructor() {
    super();
    this.state = {
      copyText: "Copy",
      hideBadge: hideBadge(),
    };
  }

  // Function to download data to a file
  download = () => {
    localStorage.setItem("hideBadge", "true");
    this.setState({ hideBadge: true });
    const data = this.props.code;
    const fileName =
      localStorage.getItem("componentName") || "htmltojsx.ml.jsx";
    var file = new Blob([data], { type: "text/javascript" });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, fileName);
    else {
      // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  copyCode = (code) => {
    this.props.copyCode(code);
    this.setState({ copyText: "Copied" });
    setTimeout(() => this.setState({ copyText: "Copy" }), 1000);
  };

  render() {
    const { code } = this.props;
    const { hideBadge } = this.state;
    const options = {
      selectOnLineNumbers: true,
      autoClosingBrackets: true,
      smoothScrolling: true,
      readOnly: true,
    };
    console.log(hideBadge);
    return (
      <div>
        <EditorBar label="JSX">
          {code && (
            <Tooltip title="Download">
              <IconButton onClick={this.download}>
                <Badge invisible={hideBadge} color="secondary" variant="dot">
                  <GetAppOutlined fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={this.state.copyText}>
            <IconButton onClick={() => this.copyCode(code)}>
              <FileCopyOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </EditorBar>
        <div className="editor-content">
          <Editor
            height="100%"
            language="javascript"
            value={code}
            options={options}
          />
        </div>
      </div>
    );
  }
}

export default JSX;
