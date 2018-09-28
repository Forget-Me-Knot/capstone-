import React, { Component } from 'react'
import Routes from './Routes'
import NavBar from './Components/Navbar'
import ProjectBar from './Components/ProjectBar'
import Grid from '@material-ui/core/Grid'

class App extends Component {
  constructor() {
    super()
		this.state = {};
	}
  render() {
    return (
			<div>
			<Grid container>
				<Grid item xs={3}>
					<Grid container>
						<Grid item xs={2}>
							<NavBar />
						</Grid>
						<Grid item xs={2}>
							<ProjectBar />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={9}>
					<Routes />
				</Grid>
			</Grid>
			</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(getUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
