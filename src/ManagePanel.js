// Imports
import React, { useState, useEffect } from "react";
import axios from "axios";

// Set States
const ManagePanel = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [finnishWord, setFinnishWord] = useState("");
  const [englishWord, setEnglishWord] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [allWords, setAllWords] = useState([]);
  const [showWords, setShowWords] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(true); // Initially visible
  const [contentsHidden, setContentsHidden] = useState(false);

  // Add password authentication to access panel
  const handleAuthentication = () => {
    // Check if the entered password is correct
    if (password === "admin123") {
      setAuthenticated(true);
      setContentsHidden(false); // Show contents after authentication
    } else {
      alert("Incorrect password. Please try again.");
    }
    setPassword(""); // Empty finput field after submitting
  };

  useEffect(() => {
    // If authenticated, fetch words
    if (authenticated) {
      const fetchWords = async () => {
        try {
          const response = await axios.get("http://localhost:3001/words");
          setAllWords(response.data);
        } catch (error) {
          console.error("Error fetching words:", error);
          alert("Error fetching words. Please try again.");
        }
      };

      fetchWords();
    }
  }, [authenticated]);

  const handleAddWord = async () => {
    try {
      // Check that both fin and eng fields are filled
      if (!finnishWord || !englishWord) {
        alert("Please enter both Finnish and English words.");
        return;
      }

      // Make API request to add word to the database
      await axios.post("http://localhost:3001/addWord", {
        finnish: finnishWord,
        english: englishWord,
      });

      alert("Word added successfully!");

      // Clear input fields after successful addition
      setFinnishWord("");
      setEnglishWord("");
    } catch (error) {
      console.error("Error adding word:", error);
      alert("Error adding word. Please try again.");
    }
  };

  const handleDisplayAllWords = async () => {
    try {
      // Make API request to get all words from the database
      const response = await axios.get("http://localhost:3001/words");
      setAllWords(response.data);
      setShowWords(!showWords); // Toggle visibility
    } catch (error) {
      console.error("Error fetching words:", error);
      alert("Error fetching words. Please try again.");
    }
  };

  const handleDeleteWord = async () => {
    try {
      // Make API request to delete word by ID
      await axios.delete(`http://localhost:3001/word/${deleteId}`);
      alert(`Word with ID ${deleteId} deleted successfully!`);
      setDeleteId("");
    } catch (error) {
      console.error("Error deleting word:", error);
      alert(`Error deleting word with ID ${deleteId}. Please try again.`);
    }
  };

  // Toggle admin panels visibility
  const handleToggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
  };

  const handleToggleContentsVisibility = () => {
    // If contents are hidden, show password input
    if (contentsHidden) {
      setContentsHidden(false);
    } else {
      // If contents are visible, hide them and reset authentication
      setContentsHidden(true);
      setAuthenticated(false);
    }
  };

  // If user is not authenticated, show password input field
  if (!authenticated) {
    return (
      <div>
        <h2>Manage Panel</h2>
        <label htmlFor="password">Enter Password: </label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleAuthentication}>
          {authenticated ? "Re-authenticate" : "Authenticate"}
        </button>
        {authenticated && showAdminPanel && (
          <button onClick={handleToggleAdminPanel}>
            {contentsHidden ? "Show Contents" : "Hide Contents"}
          </button>
        )}
      </div>
    );
  }

  // If user is authenticated, show contents of panel
  return (
    <div>
      <h1>Manage words</h1>

      {contentsHidden && (
        <div>
          <label htmlFor="password">Enter Password: </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleToggleContentsVisibility}>
            {contentsHidden ? "Show Contents" : "Hide Contents"}
          </button>
        </div>
      )}

      {!contentsHidden && (
        <>
          <div style={{ marginBottom: "8px" }}>
            <label htmlFor="finnishWord">Finnish Word: </label>
            <input
              type="text"
              id="finnishWord"
              placeholder="Finnish.."
              value={finnishWord}
              onChange={(e) => setFinnishWord(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label htmlFor="englishWord">English Word: </label>
            <input
              type="text"
              id="englishWord"
              placeholder="English.."
              value={englishWord}
              onChange={(e) => setEnglishWord(e.target.value)}
            />
          </div>

          <div className="formbuttons">
            <button className="addwordbutton" onClick={handleAddWord}>
              Add Word
            </button>
            <button className="showwordsbutton" onClick={handleDisplayAllWords}>
              {showWords ? "Hide All Words" : "Display All Words"}
            </button>
            <button
              className="hcbutton"
              onClick={handleToggleContentsVisibility}
            >
              {contentsHidden ? "Show Contents" : "Hide Contents"}
            </button>
          </div>

          {showWords && (
            <div>
              <h2>All Words</h2>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {allWords.map((word) => (
                  <li key={word.id} style={{ marginBottom: "15px" }}>
                    <div>
                      id: <i>{word.id}</i>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "10px" }}>Finnish:</div>
                      <div>
                        <b>{word.finnish}</b>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ marginRight: "10px" }}>English:</div>
                      <div>
                        <b>{word.english}</b>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
            <label htmlFor="deleteId">Delete word: </label>
            <input
              type="text"
              id="deleteId"
              placeholder="Enter ID to delete"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />
            <button className="deletebutton" onClick={handleDeleteWord}>
              Delete Word
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ManagePanel;
