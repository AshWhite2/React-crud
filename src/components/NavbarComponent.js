import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container,
} from "reactstrap";

const NavbarComponent = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand href="/">Data Anggota</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/AshWhite2/my-react-app">
                  About Me
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Hanif</NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
