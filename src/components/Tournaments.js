import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { useAuth } from "../Context";
import { Link, useHistory } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const Tournaments = () => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/home");
    } catch (err) {
      console.log(err.message);
    }
  }

  if (currentUser && currentUser.email === "parajshah2000@gmail.com") {
    return <AdminDashboard />;
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="light" variant="light">
      <Navbar.Brand>
        <Link to="/">Cube Gaming</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="">
          {currentUser ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/update-profile">Update Profile</Link>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/home">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Tournaments;
