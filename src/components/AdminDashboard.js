import React, { useRef, useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Form,
  Alert,
  Card,
  Modal,
  Table,
} from "react-bootstrap";
import { useAuth } from "../Context";
import { Link, useHistory } from "react-router-dom";

const AdminDashboard = () => {
  // context functions
  const {
    currentUser,
    logout,
    addTournament,
    setupTableHead,
    setupTournaments,
    deleteTournament,
  } = useAuth();

  // react-router-dom hook
  const history = useHistory();

  // refs
  const tournamentNameRef = useRef();
  const gameTypeRef = useRef();
  const tournamentDateRef = useRef();
  const tournamentTimeRef = useRef();
  const tournamentSponsorsRef = useRef();

  // states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [data, setData] = useState([]);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  useEffect(() => {
    const ac = new AbortController();
    const fetchData = async () => {
      const tableData = await setupTournaments();
      setData(tableData);
    };
    fetchData();
    return () => ac.abort();
  }, []);

  async function handleLogout() {
    try {
      await logout();
      history.push("/home");
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleSubmitAdd(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await addTournament(
        tournamentNameRef.current.value,
        gameTypeRef.current.value,
        tournamentDateRef.current.value,
        tournamentTimeRef.current.value,
        tournamentSponsorsRef.current.value
      );
      handleCloseAdd();
    } catch (err) {
      console.log(err.message);
    }

    setLoading(false);
  }

  const handleDelete = async (e) => {
    const rowId =
      e.target.parentElement.parentElement.getAttribute("data-document-id");
    try {
      setError("");
      setLoading(true);
      await deleteTournament(rowId);
    } catch (err) {
      console.log(err.message);
    }

    setLoading(false);
    // window.location.reload();
  };

  let headers = setupTableHead();
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
      return (
        <tr
          key={tournamentId}
          data-tournament-id={tournamentId}
          data-document-id={documentId}
        >
          <td>{tournamentName}</td>
          <td>{gameType}</td>
          <td>{tournamentDate}</td>
          <td>{tournamentTime}</td>
          <td>{tournamentSponsors}</td>
          <td>
            <Button variant="danger" className="m-1" onClick={handleDelete}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Brand>
          <Link to="/">Cube Gaming</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="">
            <Button variant="success" onClick={handleShowAdd}>
              Add Tournament
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="mt-5">
        <h2 className="my-3 text-center">Tournaments</h2>
        <Table responsive striped bordered hover id="tournaments-table">
          <thead>
            <tr>{headers}</tr>
          </thead>
          <tbody>{tableUI()}</tbody>
        </Table>
      </Container>

      {/* Add tournament modal */}
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header>
          <Modal.Title>Add a tournament!</Modal.Title>
          <Button variant="danger" onClick={handleCloseAdd}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmitAdd} id="add-tournament">
                <Form.Group id="tournament-name">
                  <Form.Label>Tournament Name</Form.Label>
                  <Form.Control type="text" ref={tournamentNameRef} required />
                </Form.Group>
                <Form.Group id="game-type">
                  <Form.Label>Game Type</Form.Label>
                  <Form.Control type="text" ref={gameTypeRef} required />
                </Form.Group>
                <Form.Group id="tournament-date">
                  <Form.Label>Tournament Date</Form.Label>
                  <Form.Control type="date" ref={tournamentDateRef} required />
                </Form.Group>
                <Form.Group id="tournament-time">
                  <Form.Label>Tournament Time</Form.Label>
                  <Form.Control type="time" ref={tournamentTimeRef} required />
                </Form.Group>
                <Form.Group id="tournament-sponsors">
                  <Form.Label>Tournament Sponsors</Form.Label>
                  <Form.Control type="text" ref={tournamentSponsorsRef} />
                  <Form.Text className="text-muted">
                    Enter name of sponsors separated by a comma
                  </Form.Text>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Go !
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminDashboard;
