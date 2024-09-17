import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logoApp} width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />
                        <span> Project #1 </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <NavLink to="/" className="nav-link"> Home </NavLink>
                            <NavLink to="/users" className="nav-link"> Manage Users </NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Setting">
                                <NavDropdown.Item href="/login"> Log in </NavDropdown.Item>
                                <NavDropdown.Item href="/logout"> Log out </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header