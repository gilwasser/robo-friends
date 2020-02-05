import React, { Component } from 'react';
import CardList from '../components/CardList';
import { robots } from '../robots';
import SearchBox from '../components/SearchBox';
import "./App.css"
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';


class App extends Component {

	constructor() {
		super();
		this.state = {
			robots: robots,
			searchField: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
				.then(users => this.setState({ robots: users }))

	}

	handleSearchChange = (event) => {
		this.setState({ searchField: event.target.value });
	}

	render() {
		const {robots, searchField} = this.state;
		const filterRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})

		if(!robots.length)
			return <h1>Loading ...</h1>

		return (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox onSearchChange={this.handleSearchChange} />
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filterRobots} />
					</ErrorBoundry>
				</Scroll>		
			</div>
		)
		
	}

}

export default App;