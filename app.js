const express = require("express");
const app = express();
app.use(express.json()); //helpful for POST method

const { connectionToDb, getDb } = require("./db");
let db;
connectionToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
  }
  db = getDb();
});

app.get("/books", (req, res) => {
  let books = [];
  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book) => books.push(book)) //in data fetching cursor will be created and only 20 items cann be returned, so forEach helps here - it takes data in buffer and gives us batch of 20
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ err: "Oops, some error occurred" });
    });
});

app.post("/books", (req, res) => {
  const book = req.body;
  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json({ err: "Could not create new document" });
    });
});
