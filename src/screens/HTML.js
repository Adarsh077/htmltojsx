import React, { Component } from "react";
import { IconButton, Button, Tooltip } from "@material-ui/core";
import { SettingsOutlined, NoteAddOutlined } from "@material-ui/icons";
import MonacoEditor from "react-monaco-editor";
import Settings from "./components/Settings";
import EditorBar from "./components/EditorBar";

export class HTML extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      showSettings: false,
    };
    this.fileInputRef = React.createRef();
    this.editor = "";
  }

  editorDidMount = (editor, monaco) => {
    editor.focus();
    this.editor = editor;
  };

  onChange = (newValue, e) => {
    this.setState({ code: newValue });
    this.props.convertCode(newValue);
    this.editor.focus();
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

  prettify = () => {
    const { code } = this.state;
    const formattedCode = this.props.prettify(code, true);
    this.setState({ code: formattedCode });
  };

  render() {
    const { editorRef } = this.props;
    const { code, showSettings } = this.state;
    const options = {
      selectOnLineNumbers: true,
      autoClosingBrackets: true,
      smoothScrolling: true,
    };
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
          <MonacoEditor
            height="100%"
            ref={editorRef}
            language="javascript"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
          />
        </div>
      </div>
    );
  }
}

export default HTML;
