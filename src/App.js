import './App.css';
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddBook from "./components/AddBook";
import BooksList from "./components/BooksList";
import { useState } from 'react';


function App() {

  const [bookId, setBookId] = useState("");
  const [addBookEvent, setAddBookEvent] = useState(false);

  const getBookIdHandler = (id) => {
    //console.log("in App", id)
    setBookId(id);
  }

  const refreshBookList = () => {
    setAddBookEvent(true);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home" style={{ margin: "auto" }}>Library - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook bookId={bookId} setBookId={setBookId} refreshBookList={refreshBookList} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BooksList getBookId={getBookIdHandler} addBookEvent={addBookEvent} setAddBookEvent={setAddBookEvent} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
