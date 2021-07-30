import React, { useRef, useState, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAuth } from "../Context";

const Register = () => {
  const { currentUser, logout, setupTournament } = useAuth();
  const history = useHistory();
  const { id } = useParams();

  const [tournament, setTournament] = useState([]);

  async function handleLogout() {
    try {
      await logout();
      history.push("/home");
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = async () => {
      if (currentUser) {
        const tournament = await setupTournament(id);
        setTournament(tournament);
      }
    };
    fetchData();
    return () => ac.abort();
  }, []);

  if (currentUser) {
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="light" variant="light">
          <Navbar.Brand>
            <Link to="/">Cube Gaming</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="">
              <Link to="/tournaments">Tournaments</Link>
              <Link to="/update-profile">Update Profile</Link>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container></Container>
      </>
    );
  } else {
    return (
      <h2 className="text-center mb-4">
        To register please signup / login first!
      </h2>
    );
  }
};

export default Register;
