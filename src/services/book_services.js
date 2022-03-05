import { db } from '../firebase-config';
import { collection, getDocs, addDoc, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const bookCollectonRef = collection(db, "books");
class BookDataService {
  addBooks = (newBook) => {
    return addDoc(bookCollectonRef, newBook);
  }

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "books", id);
    return updateDoc(bookDoc, updatedBook);
  }

  deleteBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return deleteDoc(bookDoc);
  }

  getAllBooks = () => {
    return getDocs(bookCollectonRef);
  }

  getBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  }
}

export default new BookDataService();