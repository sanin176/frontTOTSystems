import React, {Component} from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component {
    render() {
        const marginRight = {
            marginRight: "10px"
        };

        return (
            <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
                <Navbar.Brand>
                    <Link to={""} className="navbar-brand">
                        TOT Systems
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>


                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <NavDropdown title="Securities" id="basic-nav-dropdown" style={marginRight}>
                            <NavDropdown.Item href="createSecurities">Add Securities</NavDropdown.Item>
                            <NavDropdown.Item href="readDeleteUpdateSecurities">Read Delete Update Securities</NavDropdown.Item>
                            <NavDropdown.Item href="uploadFileSecurities">Add file for Securities</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="History" id="basic-nav-dropdown" style={marginRight}>
                            <NavDropdown.Item href="createHistory">Add History</NavDropdown.Item>
                            <NavDropdown.Item href="readDeleteUpdateHistory">Read Delete Update History</NavDropdown.Item>
                            <NavDropdown.Item href="uploadFileHistory">Add file for History</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="SecuritiesHistory" id="basic-nav-dropdown" style={marginRight}>
                            <NavDropdown.Item href="readBothSecuritiesHistories">Read Securities and History</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}