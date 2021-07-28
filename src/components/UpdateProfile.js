import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Navbar,
  Nav,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "../Context";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  // refs
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const whatsAppPhoneRef = useRef();
  const phoneRef = useRef();
  const pubgUsernameRef = useRef();
  const valorantUsernameRef = useRef();
  const freeFireUsernameRef = useRef();

  // auth
  const {
    currentUser,
    updatePassword,
    updateEmail,
    updateCurrentUserDetails,
    logout,
    setupCurrentUserData,
  } = useAuth();

  // states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState([]);

  // react-router-dom
  const history = useHistory();

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
    const getUserData = async () => {
      if (currentUser) {
        const userData = await setupCurrentUserData();
        setCurrentUserData(userData);
      }
    };
    getUserData();
    return () => ac.abort();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(
        updateEmail(emailRef.current.value, currentUserData[0]["document-id"])
      );
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    if (
      firstNameRef.current.value ||
      lastNameRef.current.value ||
      pubgUsernameRef.current.value ||
      valorantUsernameRef.current.value ||
      freeFireUsernameRef.current.value ||
      whatsAppPhoneRef.current.value
    ) {
      promises.push(
        updateCurrentUserDetails(
          currentUserData[0]["document-id"],
          firstNameRef.current.value,
          lastNameRef.current.value,
          pubgUsernameRef.current.value,
          valorantUsernameRef.current.value,
          freeFireUsernameRef.current.value,
          whatsAppPhoneRef.current.value
        )
      );
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
        history.push("/update-profile");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
              <Link to="/">Home</Link>
              <Link to="/tournaments">Tournaments</Link>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container className="d-flex justify-content-center align-items-center mt-5">
          <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <Card style={{ width: "90%" }}>
              <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Row>
                    {currentUserData.map((user, index) => {
                      const {
                        cubeId,
                        email,
                        firstName,
                        lastName,
                        freeFireUsername,
                        phone,
                        pubgUsername,
                        valorantUsername,
                        whatsAppPhone,
                      } = user;

                      return (
                        <React.Fragment key={index}>
                          <Col xs="12" md="6">
                            <Form.Group id="first-name">
                              <Form.Label>
                                First Name
                                <span className="required-field"> *</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                ref={firstNameRef}
                                required
                                defaultValue={firstName}
                              />
                            </Form.Group>
                            <Form.Group id="last-name">
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control
                                type="text"
                                ref={lastNameRef}
                                defaultValue={lastName}
                              />
                            </Form.Group>
                            <Form.Group id="email">
                              <Form.Label>
                                Email<span className="required-field"> *</span>
                              </Form.Label>
                              <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                                defaultValue={email}
                              />
                            </Form.Group>
                            <Form.Group id="password">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                type="password"
                                ref={passwordRef}
                                placeholder="Leave blank to keep the same"
                              />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                              <Form.Label>Password Confirmation</Form.Label>
                              <Form.Control
                                type="password"
                                ref={passwordConfirmRef}
                                placeholder="Leave blank to keep the same"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs="12" md="6">
                            <Form.Group id="pubg-username">
                              <Form.Label>Pubg Username</Form.Label>
                              <Form.Control
                                type="text"
                                ref={pubgUsernameRef}
                                defaultValue={pubgUsername}
                              />
                            </Form.Group>
                            <Form.Group id="valorant-username">
                              <Form.Label>Valorant Username</Form.Label>
                              <Form.Control
                                type="text"
                                ref={valorantUsernameRef}
                                defaultValue={valorantUsername}
                              />
                            </Form.Group>
                            <Form.Group id="free-fire-username">
                              <Form.Label>Free fire Username</Form.Label>
                              <Form.Control
                                type="text"
                                ref={freeFireUsernameRef}
                                defaultValue={freeFireUsername}
                              />
                            </Form.Group>
                            <Form.Group id="whatsApp-phone">
                              <Form.Label>
                                WhatsApp Phone Number
                                <span className="required-field"> *</span>
                              </Form.Label>
                              <Form.Control
                                type="number"
                                ref={whatsAppPhoneRef}
                                required
                                defaultValue={whatsAppPhone}
                              />
                            </Form.Group>
                            <Form.Group id="phone">
                              <Form.Label>
                                Phone Number
                                <span className="required-field"> *</span>
                              </Form.Label>
                              <Form.Control
                                type="number"
                                ref={phoneRef}
                                required
                                defaultValue={phone}
                              />
                            </Form.Group>
                          </Col>
                        </React.Fragment>
                      );
                    })}
                  </Row>
                  <Button
                    disabled={loading}
                    className="w-100 mt-3"
                    type="submit"
                  >
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              <Link to="/">Cancel</Link>
            </div>
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="light" variant="light">
          <Navbar.Brand>
            <Link to="/">Cube Gaming</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="">
              <Link to="/home">Home</Link>
              <Link to="/tournaments">Tournaments</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container className="d-flex justify-content-center align-items-center mt-5">
          <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <h2 className="text-center mb-4">
              To update profile please signup / login first!
            </h2>
          </div>
        </Container>
      </>
    );
  }
}
