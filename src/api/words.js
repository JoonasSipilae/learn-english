// api/words.js
const mysql = require("mysql");
const config = require("../config");

const db = mysql.createConnection(config.databaseOptions);

module.exports = (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      handleGet(req, res);
      break;
    case "POST":
      handlePost(req, res);
      break;
    case "DELETE":
      handleDelete(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
};

const handleGet = (req, res) => {
  console.log("Request received at /words");
  const query = "SELECT * FROM word";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("Sending words:", result);
    res.status(200).json(result);
  });
};

const handlePost = (req, res) => {
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
};

const handleDelete = (req, res) => {
  const { id } = req.query;

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
};
