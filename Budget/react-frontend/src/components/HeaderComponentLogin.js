import React, { Component } from 'react'
import {Nav,Navbar,NavItem,NavbarBrand, NavLink} from 'reactstrap';

class HeaderComponentLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
            <Navbar color="dark" dark  expand="md">
              <NavbarBrand href="http://localhost:3000/transactions">
              <img src="piggy-bank.png" alt="Logo" width="30" height="30" className="d-inline-block align-top mr-2" />
                Budget Tracker</NavbarBrand>
                <Nav className="navbar navbar-expand-md navbar-dark bg-dark" navbar>
                  <NavItem>
                    <NavLink href="http://localhost:3000/">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="http://localhost:3000/register">Register</NavLink>
                  </NavItem>
                </Nav>
          
            </Navbar>
          </div>
        );
    }
}

export default HeaderComponentLogin
