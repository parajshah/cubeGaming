import React, { useRef, useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  Button,
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "../Context";
import { Link, useHistory } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const Tournaments = () => {
  const { currentUser, logout, setupTournaments } = useAuth();

  const [data, setData] = useState([]);

  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/home");
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleRegister = (e) => {
    console.log(e.target);
  };

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = async () => {
      const tableData = await setupTournaments();
      setData(tableData);
    };
    fetchData();
    return () => ac.abort();
  }, []);

  const tableUI = () => {
    return data.map((tournament) => {
      const {
        tournamentName,
        gameType,
        tournamentDate,
        tournamentTime,
        tournamentSponsors,
        tournamentId,
        documentId,
      } = tournament;

      const time =
        tournamentTime.split(":")[0] > "12"
          ? `${parseInt(tournamentTime.split(":")[0]) - 12}:${
              tournamentTime.split(":")[1]
            } PM`
          : `${parseInt(tournamentTime.split(":")[0])}:${
              tournamentTime.split(":")[1]
            } AM`;

      const year = tournamentDate.split("-")[0];
      const month = parseInt(tournamentDate.split("-")[1]);
      const day = parseInt(tournamentDate.split("-")[2]);

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const date = `${day} ${months[month - 1]}, ${year}`;

      const images = [
        "/images/pubg.jpg",
        "/images/cod.png",
        "/images/free-fire.jpg",
      ];

      let imageSrc;
      if (gameType === "Pubg Mobile") {
        imageSrc = images[0];
      } else if (gameType === "Valorant") {
        imageSrc = images[1];
      } else if (gameType === "Free Fire") {
        imageSrc = images[2];
      }

      return (
        <Col xs="12" md="6" lg="4" className="my-3" key={tournamentId}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">{tournamentName}</h2>
              <img src={imageSrc} className="img img-fluid" />
              <p className="mt-2 text-center mb-0">
                {date}, {time}
              </p>
              {tournamentSponsors.length > 0 ? (
                <h5 className="mt-2 text-center mb-0">
                  Sponsors: {tournamentSponsors}
                </h5>
              ) : (
                ""
              )}

              <Button
                className="w-100 mt-3"
                type="button"
                data-tournament-id={tournamentId}
                onClick={handleRegister}
              >
                Register
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  if (currentUser && currentUser.email === "parajshah2000@gmail.com") {
    return <AdminDashboard />;
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
      <Container>
        <h2 className="my-3 text-center">Tournaments</h2>
        <Row>{tableUI()}</Row>
      </Container>
    </>
  );
};

export default Tournaments;
