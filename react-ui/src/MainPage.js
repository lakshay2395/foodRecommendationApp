import React, { Component } from 'react';

import NavBar from './NavBar';
import FoodItemsGrid from './FoodItemsGrid';
import LoginDialog from './LoginDialog';

class MainPage extends Component{
    render(){
        return (
            <Segment>
                <Dimmer inverted size="massive" active>
                    <Loader>Loading</Loader>
                </Dimmer>
                <NavBar/>
                <FoodItemsGrid/> 
                <LoginDialog/>
            </Segment>
        );
    }
}

export default MainPage;