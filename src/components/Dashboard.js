import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Carousel,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useAuth } from "../Context";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
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

      <Container className="my-5">
        <Row>
          <Col className="d-flex flex-column align-items-center justify-content-center mb-4">
            <Row>
              <h3>THE PERFECT PLATFORM TO EARN THROUGH GAMING!</h3>
              <p>
                REGISTER TODAY AND START EARNING MONEY THROUGH YOUR GAMING
                SKILLS. WE CONDUCT TOURNAMENT FOR MOBILE AND PC GAME
              </p>
            </Row>
            <Row>
              <Button
                variant="outline-primary"
                onClick={() => {
                  history.push("/tournaments");
                }}
              >
                Register Now!
              </Button>
            </Row>
          </Col>
          <Col xs="12" md="6">
            <Carousel>
              <Carousel.Item interval={4000}>
                <img
                  className="d-block w-100 img-fluid"
                  src="/images/pubg.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <img
                  className="d-block w-100 img-fluid"
                  src="/images/cod.png"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <img
                  className="d-block w-100 img-fluid"
                  src="/images/free-fire.jpg"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
}
