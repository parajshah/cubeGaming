import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useAuth } from "../Context";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const phoneRef = useRef();
  // const whatsAppPhoneRef = useRef();
  // const pubgUsernameRef = useRef();
  // const valorantUsernameRef = useRef();
  // const freeFireUsernameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const ac = new AbortController();
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        phoneRef.current.value
      );
      history.push("/");
      return () => ac.abort();
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Brand>
          <Link to="/home">Cube Gaming</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="">
            <Link to="/home">Home</Link>
            <Link to="/tournaments">Tournaments</Link>
            <Link to="/login">Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="d-flex justify-content-center align-items-center mt-5">
        <div
          className="d-flex flex-column justify-content-center align-items-center w-100"
          style={{ maxWidth: "400px" }}
        >
          <Card style={{ width: "90%" }}>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="first-name">
                  <Form.Label>
                    First Name<span className="required-field"> *</span>
                  </Form.Label>
                  <Form.Control type="text" ref={firstNameRef} required />
                </Form.Group>
                <Form.Group id="last-name">
                  <Form.Label>
                    Last Name<span className="required-field"> *</span>
                  </Form.Label>
                  <Form.Control type="text" ref={lastNameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>
                    Email<span className="required-field"> *</span>
                  </Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>
                    Password<span className="required-field"> *</span>
                  </Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>
                    Password Confirmation
                    <span className="required-field"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                  <Form.Text className="text-muted">
                    Enter same password again
                  </Form.Text>
                </Form.Group>
                <Form.Group id="phone">
                  <Form.Label>
                    Phone Number<span className="required-field"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    ref={phoneRef}
                    required
                    placeholder="Example... 8370215813 "
                  />
                  <Form.Text className="text-muted">
                    Enter only phone number (without country code / symbols like
                    +/-)
                  </Form.Text>
                </Form.Group>
                {/* <Form.Group id="whatsApp-phone">
                  <Form.Label>
                    WhatsApp Phone Number
                    <span className="required-field"> *</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    ref={whatsAppPhoneRef}
                    required
                    placeholder="Example... 8370215813 "
                  />
                </Form.Group>
                <Form.Group id="pubg-username">
                  <Form.Label>Pubg Username</Form.Label>
                  <Form.Control type="text" ref={pubgUsernameRef} />
                </Form.Group>
                <Form.Group id="valorant-username">
                  <Form.Label>Valorant Username</Form.Label>
                  <Form.Control type="text" ref={valorantUsernameRef} />
                </Form.Group>
                <Form.Group id="free-fire-username">
                  <Form.Label>Free fire Username</Form.Label>
                  <Form.Control type="text" ref={freeFireUsernameRef} />
                </Form.Group> */}
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center my-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
