import React, { Component, createRef } from "react";
import { IconButton, Button, Tooltip } from "@material-ui/core";
import { SettingsOutlined, NoteAddOutlined } from "@material-ui/icons";
import Settings from "./components/Settings";
import EditorBar from "./components/EditorBar";

export class HTML extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      showSettings: false,
    };
    this.htmlEditorRef = createRef();
  }

  onChange = async (e) => {
    const { value } = e.target;
    this.setState({ code: value });
    await this.props.convertCode(value);
    this.htmlEditorRef.current.focus();
  };

  handleSettingsClose = () => {
    this.setState({ showSettings: false });
  };

  handleFileUpload = (e) => {
    var input = e.target;
    var reader = new FileReader();
    reader.onload = () => {
      this.setState({ code: reader.result });
      this.props.convertCode(reader.result);
    };
    reader.readAsText(input.files[0]);
  };

  prettify = async () => {
    const { code } = this.state;
    const { prettify } = await import("../utils/prettifyHTML");
    const formattedCode = prettify(code);
    if (formattedCode.err) {
      this.props.convertCode(formattedCode.err, true);
    } else {
      this.setState({ code: formattedCode });
    }
  };

  render() {
    const { code, showSettings } = this.state;
    return (
      <div>
        <EditorBar label="HTML">
          <input
            type="file"
            value=""
            ref={this.fileInputRef}
            onChange={this.handleFileUpload}
            hidden
          />
          <Tooltip title="Load File">
            <IconButton onClick={() => this.fileInputRef.current.click()}>
              <NoteAddOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton onClick={() => this.setState({ showSettings: true })}>
              <SettingsOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          <Button onClick={this.prettify}>Prettify</Button>
        </EditorBar>
        <Settings open={showSettings} handleClose={this.handleSettingsClose} />
        <div className="editor-content">
          <textarea
            spellCheck="false"
            wrap="off"
            className="editor-area"
            value={code}
            ref={this.htmlEditorRef}
            onChange={this.onChange}
          ></textarea>
        </div>
      </div>
    );
  }
}

export default HTML;
