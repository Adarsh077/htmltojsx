import React, { Component } from "react";
import { IconButton, Tooltip, Badge } from "@material-ui/core";
import { FileCopyOutlined, GetAppOutlined } from "@material-ui/icons";
import EditorBar from "./components/EditorBar";

const localStorage = window.localStorage;

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
    this.setState({ hideBadge: true });
    import("../utils/donwloadFile").then((download) => {
      download.donwloadFile(this.props.code);
    });
  };

  copyCode = (code) => {
    this.props.copyCode(code);
    this.setState({ copyText: "Copied" });
    setTimeout(() => this.setState({ copyText: "Copy" }), 1000);
  };

  render() {
    const { code } = this.props;
    const { hideBadge } = this.state;
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
        <div className="editor-content ">
          <textarea
            spellCheck="false"
            wrap="off"
            readOnly
            className="editor-area editor-jsx"
            value={code}
          ></textarea>
        </div>
      </div>
    );
  }
}

export default JSX;
