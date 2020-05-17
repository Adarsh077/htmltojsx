import React from "react";
import { Paper, Typography, Grid } from "@material-ui/core";

function EditorBar(props) {
  return (
    <div>
      <Paper className="editorbar">
        <Grid container spacing={3} alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="body1">{props.label}</Typography>
          </Grid>
          <Grid item>{props.children}</Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default EditorBar;
