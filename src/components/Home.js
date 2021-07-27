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
import { Link } from "react-router-dom";
import { useAuth } from "../Context";

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Brand>
          <Link to="/home">Cube Gaming</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="">
            <Link to="/tournaments">Tournaments</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
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
              <Button variant="outline-primary">Register Now!</Button>
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
};

export default Home;
