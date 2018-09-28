import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import firebase from '../firebase'

const styles = theme => ({
  icon: {
    height: '30px',
	},
	paper: {
		width: 90
	}
});

class MiniDrawer extends React.Component {
	constructor(){
		super()
		this.logOut = this.logOut.bind(this)
	}
	logOut(){
		firebase.auth().signOut().then(function() {
			console.log('Sign out!')
			console.log(firebase.auth().currentUser)
		}, function(error){
			console.error(error)
		})
	}
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer variant="permanent" className={classes.paper}>
          <List>
						<ListItem>
							<Link to="/login" style={{ textDecoration: 'none' }}><img className={classes.icon} src="reminder.png" alt="home" /></Link>
						</ListItem>
          </List>
					<Button size="small" onClick={this.logOut}>LOGOUT</Button>
        </Drawer>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
