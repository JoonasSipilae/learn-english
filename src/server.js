// Use mysql and express
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

/*
const app = express();
const port = 3001;

// Use .config file to get login information
var config = require("./config");
const db = mysql.createConnection(config.databaseOptions);
*/
//////////////////////////////////////////////////////
const app = express();
const port = process.env.PORT || 3001;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
//////////////////////////////////////////////////////

// Use cors
app.use(cors());
app.use(bodyParser.json());

// Get table from database
app.get("/words", (req, res) => {
  console.log("Request received at /words");
  const query = "SELECT * FROM word";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("Sending words:", result);
    res.send(result);
  });
});

// Add word to the table
app.post("/addWord", (req, res) => {
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

// Delete word with matching ID from database
app.delete("/word/:id", (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
