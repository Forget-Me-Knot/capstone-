import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import firebase from "../firebase";
import Avatar from "@material-ui/core/Avatar"
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  icon: {
    height: "40px"
  },
  paper: {
		width: 80
	},
	popup: {
		fontSize: 13
	}
});

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: [] || null,
      user: {},
			login: null,
			selected: false
		};
		this.logOut = this.logOut.bind(this);
		this.clickNav = this.clickNav.bind(this)
  }

  componentDidMount() {
		const self = this
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
				self.setState({user})
				let userProjects = []
				const ref = firebase.database().ref('projects')
				ref.on('value', function(snapshot){
					const projects = snapshot.val()
					for(let key in projects){
						if(projects[key].members){
							const members = projects[key].members
							const name = projects[key].name
							const color = projects[key].color
							if( members.includes(user.email) ){
								userProjects.push({name, key, color})
							}
						}
					}
					self.setState({projects: userProjects})
				})
      }
    });
  }

  logOut() {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          console.log("Sign out!");
          console.log(firebase.auth().currentUser);
        },
        function(error) {
          console.error(error);
        }
      );
    this.setState({
      user: {}
    });
    this.props.handleLogout();
	}

	clickNav(key){
		this.props.setProject(key)
	}

  render() {
		const { user, projects, selected } = this.state
		const { classes } = this.props
    return (
      <div className={classes.root}>
        <Drawer variant="permanent" className={classes.paper}>
          <List style={{width: 78}}>
            <ListItem style={{right: 10}}>
							<Avatar style={{width: '50px', height: '50px', backgroundColor: 'white'}}
								src='/reminder.png' alt='home'
              />
            </ListItem>
            {user.uid ? (
              <ListItem>
								<Link to='/home' replace>
								<Tooltip classes={{tooltip: classes.popup}} title='Logout' placement="left-start">
									<Avatar style={{width: '30px', height: '30px', backgroundColor: 'white', color: 'grey'}}
										onClick={this.logOut} >
										<Icon>logout</Icon>
									</Avatar>
								</Tooltip>
								</Link>
              </ListItem>
            ) : (
              <ListItem component={Link} to="/login" replace>
								<Tooltip classes={{tooltip: classes.popup}} title='Login' placement="left-start">
									<Avatar style={{width: '30px', height: '30px', backgroundColor: 'white', color: 'grey'}}>
										<Icon>input</Icon>
									</Avatar>
								</Tooltip>
              </ListItem>
            )}
            <ListItem component={Link} to="/calendar" onClick={() => this.clickNav('key')} replace>
						<Tooltip classes={{tooltip: classes.popup}} title='Calendar' placement="left-start">
							<Avatar style={{width: '30px', height: '30px', backgroundColor: 'white', color: 'grey'}}>
								<Icon>calendar_today</Icon>
							</Avatar>
						</Tooltip>
            </ListItem>
						{
							projects && user.uid ?
							projects.map(project => (
								<ListItem key={project.key} onClick={() => this.clickNav(project.key)}>
									<Tooltip classes={{tooltip: classes.popup}} title={project.name} placement="left-start">
									<Link to='/project'>
									<Avatar style={{
										backgroundColor: `#${project.color}`,
										width: '30px', height: '30px'
									}}
									/>
									</Link>
									</Tooltip>
								</ListItem>
							))
						: null
						}
          </List>
        </Drawer>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Navbar);