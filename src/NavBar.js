import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

const NavBar = () => {
    return (
        <Navbar className="Navigation" expand="md">
            <NavLink exact to="/" className="navbar-brand">
                Jobly
            </NavLink>

            <Nav className="ms-auto" navbar>
                <NavItem className="me-4">
                    <NavLink className="nav-link" to="/companies">Companies</NavLink>
                </NavItem>
                <NavItem className="me-4">
                    <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                </NavItem>
                <NavItem className="me-4">
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
}

export default NavBar;