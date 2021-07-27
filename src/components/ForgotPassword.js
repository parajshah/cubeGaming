import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
import { useAuth } from "../Context";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
            <Link to="/tournaments">Tournaments</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
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
              <h2 className="text-center mb-4">Password Reset</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
