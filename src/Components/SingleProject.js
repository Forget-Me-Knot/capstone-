import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = {
  root: {
    flexGrow: 1
  }
};

class SingleProject extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Notes" />
          <Tab label="Members" />
          <Tab label="Todos" />
          <Tab label="Events" />
          <Tab label="Photos" />
        </Tabs>
      </Paper>
    );
  }
}

SingleProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleProject);