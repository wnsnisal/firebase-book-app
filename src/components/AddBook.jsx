import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from '../services/book_services';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = ({bookId,setBookId,refreshBookList}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message,setMessage] = useState({error:false,msg:""});
  const [buttonText, setButtonText] = useState("");

  const showErrorMsg = (msg,is_error)=>{
    
    if(message.msg === ""){
      return;
    }
    if(is_error == true){
      toast.error(msg, {
        autoClose: 2000,
        className: "dangerColor",
        position: toast.POSITION.TOP_CENTER,
      });
    }else{
      toast.success(msg, {
        autoClose: 2000,
        className: "primaryColor",
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setMessage({error:false,msg:""});//set to default

  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    // setMessage({error:false,msg:""});//set to default
    if(title === "" || author === ""){
      setMessage({error:true,msg:"All fields are mandatory!"});
      return;
    }

    const newBook = {
      title,
      author,
      status
    }
    //console.log(newBook);

    try {
      if(bookId !== undefined && bookId !== ""){
        // console.log("edit")
        await BookDataService.updateBook(bookId,newBook);
        
        setBookId("");
        
        setMessage({error:false,msg:"Book update successfully!"});

        refreshBookList();
      }else{
        // console.log("add")
        await BookDataService.addBooks(newBook);
        
        setMessage({error:false,msg:"Book added successfully!"});

        refreshBookList();
      }

      
    } catch (error) {
      setMessage({error:true,msg:"Book added failed!"});
    }
  }

  useEffect(()=>{
    //console.log("no id")
    setButtonText("Add");
    if(bookId !== undefined && bookId !== ""){
      //console.log("in use Effect", bookId);
      editHandler(bookId);
      setButtonText("Edit");
    }
  },[bookId]);

  const editHandler = async (bookId)=>{
    //console.log(bookId);
    setMessage({});
    try{
      const docSnap = await BookDataService.getBook(bookId);
      //console.log(docSnap.data())
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    }catch(error){
      setMessage({error:true,msg:error.message})
    }
  }

  return (
    <>
    {showErrorMsg(message.msg,message.error)}
    <ToastContainer />
      <div className="p-4 box">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Book Author"
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={()=>{
                setStatus("Available");
                setFlag(true);
              }}
            >
              Available
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={()=>{
                setStatus("Not Available");
                setFlag(false);
              }}
            >
              Not Available
            </Button>
          </ButtonGroup>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              {buttonText}
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default AddBook