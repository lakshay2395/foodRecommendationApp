import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Header } from 'semantic-ui-react';
import UserComponent from './UserComponent';
import FoodItemsGrid from './FoodItemsGrid';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <div>
        <UserComponent/>
        <FoodItemsGrid/>
      </div>
    );
  }
}

export default App;