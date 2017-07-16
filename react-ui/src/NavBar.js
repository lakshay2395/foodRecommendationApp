import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable={true} size="massive" color="teal" inverted>
        <Menu.Item>
          Food Recommendation App
        </Menu.Item>
        <Menu.Item position="right"> 
          <Dropdown text='User' >
            <Dropdown.Menu>
              <Dropdown.Item text='Edit Profile' onClick={this.props.editProfile}/>
              <Dropdown.Item text='Logout' onClick={this.props.logout} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    )
  }
}
