/** THIS CODE IS RUNNING ON ANOTHER SERVER */
// https://learn-english-123-server.onrender.com/words

// Use express, mysql, cors and bodyparser
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Connection info is stored at config.js
var config = require("./config");
const db = mysql.createConnection(config.databaseOptions);

app.use(cors());

/** GET */
app.get("/words", (req, res) => {
  console.log("Request received at /words");

  const query = "SELECT * FROM word";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(result);
  });
});

/** POST */
app.post("/addWord", (req, res) => {
  console.log("Received POST request at /addWord", req.body); // Debugging
  const { finnish, english } = req.body;
  const query = "INSERT INTO word (finnish, english) VALUES (?, ?)";

  db.query(query, [finnish, english], (err, result) => {
    if (err) {
      console.error("Error adding word to the database:", err);
      res.status(500).send("Error adding word to the database");
    } else {
      res.status(200).send("Word added successfully");
    }
  });
});

/** DELETE */
app.delete("/word/:id", (req, res) => {
  console.log(`Received DELETE request at /word/${req.params.id}`); // Debugging
  const { id } = req.params;
  const query = "DELETE FROM word WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting word:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (result.affectedRows === 0) {
      return res.status(404).send("Word not found");
    }
    res.status(200).send("Word deleted successfully");
  });
});

/** Log to console when server is running + on what port */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
