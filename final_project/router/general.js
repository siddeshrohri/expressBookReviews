const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  // Check if username already exists
  if (users[username]) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // You can add the user to the users object or perform other registration logic here
  users[username] = password;

  return res.status(201).json({ message: "User registered successfully" });
});
  

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    const bookList = books;
    return res.status(200).json(bookList);
  });  

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    
    if (books[isbn]) {
      const bookDetails = books[isbn];
      return res.status(200).json(bookDetails);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });
  
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const matchingBooks = [];
  
    for (const isbn in books) {
      if (books[isbn].author === author) {
        matchingBooks.push(books[isbn]);
      }
    }
  
    if (matchingBooks.length > 0) {
      return res.status(200).json(matchingBooks);
    } else {
      return res.status(404).json({ message: "No books found for the provided author" });
    }
  });
  

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const matchingBooks = [];
  
    for (const isbn in books) {
      if (books[isbn].title === title) {
        matchingBooks.push(books[isbn]);
      }
    }
  
    if (matchingBooks.length > 0) {
      return res.status(200).json(matchingBooks);
    } else {
      return res.status(404).json({ message: "No books found with the provided title" });
    }
  });
  

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    
    if (books[isbn]) {
      const bookReviews = books[isbn].reviews;
      return res.status(200).json(bookReviews);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });
  

module.exports.general = public_users;
