import React, { Component } from 'react';
import './Container.css';
import axios from 'axios';
import Treasure from '../Treasure';

export default class Container extends Component {
  constructor() {
    super();
    this.state = {
      treasures: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ treasures: {} });
    }
  }
  // Three seperate endpoints.
  // All calls wrapped in arrow functions

  getTreasure = e => {
    const { name } = e.target;
    axios
      .get(`/api/treasure/${name}`)
      .then(res =>
        this.setState({
          treasures: { ...this.state.treasures, [name]: res.data },
        })
      )
      .catch(err => alert(err.response.request.response));
  };

  addMyTreasure = addedTreasure => {
    this.setState({ treasures: { ...this.state.treasures, user: addedTreasure } });
  };

  render() {
    const { username } = this.props.user;
    const { dragon, user, all } = this.state.treasures;
    return (
      <div className="Container">
        {dragon ? (
          <div className="treasureBox loggedIn">
            <h1>Dragon's treasure</h1>
            <Treasure treasure={dragon} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={this.getTreasure} name="dragon">
              See Dragon's <br /> Treasure
            </button>
            <p>This treasure trove does not require a user to be logged in for access</p>
          </div>
        )}
        {user && username ? (
          <div className="treasureBox loggedIn">
            <h1>
              {this.props.user.username}
              's treasure
            </h1>
            <Treasure treasure={user} addMyTreasure={this.addMyTreasure} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={this.getTreasure} name="user">
              See My <br /> Treasure
            </button>
            <p>This treasure trove requires a user to be logged in for access</p>
          </div>
        )}
        {all && username ? (
          <div className="treasureBox loggedIn">
            <h1>All treasure</h1>
            <Treasure treasure={all} />
          </div>
        ) : (
          <div className="treasureBox">
            <button className="title" onClick={this.getTreasure} name="all">
              See All <br /> Treasure
            </button>
            <p>This treasure trove requires a user to be a logged in as an admin user for access</p>
          </div>
        )}
      </div>
    );
  }
}
