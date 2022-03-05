import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import BookDataService from '../services/book_services';

function BooksList({getBookId,addBookEvent,setAddBookEvent}) {

  const [books,setBooks] = useState("");

  useEffect(()=>{
    getBooks();
  },[]);

  useEffect(()=>{
    // console.log(addBookEvent)
    getBooks();
    setAddBookEvent(false);
  },[addBookEvent]);

  const getBooks = async () => {

    const data = await BookDataService.getAllBooks();

    // const books = [];
    // data.docs.map(doc=>{
    //   books.push({...doc.data(),id:doc.id});
    // })
    // setBooks(books);

    setBooks(data.docs.map(doc=>({...doc.data(),id:doc.id})));

  }

  const deleteHandler = async (id)=>{
    await BookDataService.deleteBook(id);
    getBooks();
  }
  return (
    <>
      {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {books && books.map((book,index)=>(
          <tr key={book.id}>
            <td>{index+1}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.status}</td>
            <td>
              <Button
                variant="secondary"
                className="edit"
                onClick={(e)=>getBookId(book.id)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="delete"
                onClick={()=>deleteHandler(book.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
        
        </tbody>
      </Table>
    </>
  )
}

export default BooksList