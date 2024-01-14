// Imports
import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // Import the CSS file

function Main() {
  // Set States
  const [allWords, setAllWords] = useState([]);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [displayFeedback, setDisplayFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [displayCorrectAnswers, setDisplayCorrectAnswers] = useState(false);
  const [displayIncorrectAnswers, setDisplayIncorrectAnswers] = useState(false);
  const [translationDirection, setTranslationDirection] =
    useState("finnishToEnglish"); // Fin to Eng or Eng to Fin
  const [gameStarted, setGameStarted] = useState(false); // Track whether the game has started

  useEffect(() => {
    fetchWords();
  }, []);

  // Fetch words from database
  const fetchWords = () => {
  //fetch("http://localhost:3001/words")
    fetch("https://learn-english-llmo.onrender.com/")
      .then((response) => response.json())
      .then((data) => {
        setAllWords(data);
        setShuffledWords([...data].sort(() => Math.random() - 0.5)); // Shuffle the array
      })
      .catch((error) => console.error("Error:", error));
  };

  // Translation direction eng-fin or fin-eng
  const toggleTranslationDirection = () => {
    setTranslationDirection((prevDirection) =>
      prevDirection === "finnishToEnglish"
        ? "englishToFinnish"
        : "finnishToEnglish"
    );
  };

  // Get current translatable word
  const getCurrentWord = () => {
    if (
      shuffledWords.length === 0 ||
      currentWordIndex < 0 ||
      currentWordIndex >= shuffledWords.length
    ) {
      // Handle the case when shuffledWords is empty or currentWordIndex is out of bounds
      return "";
    }

    if (translationDirection === "finnishToEnglish") {
      return shuffledWords[currentWordIndex].finnish || "";
    } else {
      return shuffledWords[currentWordIndex].english || "";
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Enter = submit
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkAnswer();
    }
  };

  // If the game hasn't started, do nothing
  const checkAnswer = () => {
    if (!gameStarted) {
      return;
    }

    // If list of words is empty
    if (shuffledWords.length === 0 || gameOver) {
      console.error("No words available or game over.");
      return;
    }

    // Display a warning and prevent checking answer if the input is empty
    if (userInput.trim() === "") {
      // DISPLAYING WARNING DOESNT WORK. WHY ???
      setFeedbackText(
        "Cannot submit an empty answer. Please enter a valid answer."
      );
      setDisplayFeedback(true); // Show the feedback
      setIsCorrect(null); // Reset isCorrect state
      return;
    }

    // Works in any upper/lowercase combination in answer
    const currentWord = shuffledWords[currentWordIndex];
    const userInputLower = userInput.toLowerCase();
    let correctAnswer;

    // Fetch answer in the right language
    if (translationDirection === "finnishToEnglish") {
      correctAnswer = currentWord.english.toLowerCase();
    } else {
      correctAnswer = currentWord.finnish.toLowerCase();
    }

    const isAnswerCorrect = userInputLower === correctAnswer;

    setIsCorrect(isAnswerCorrect);

    // Keep count of right / wrong answers. Show feedback
    if (isAnswerCorrect) {
      setCorrectCount((count) => count + 1);
      setCorrectAnswers((prevAnswers) => [...prevAnswers, currentWord]); // Add correct answer to the array
    } else {
      setIncorrectAnswers((prevAnswers) => [...prevAnswers, currentWord]); // Add incorrect answer to the array
    }

    // Show correct or incorrect message
    setFeedbackText(isAnswerCorrect ? "Correct!" : "Incorrect.");

    if (!isAnswerCorrect) {
      setDisplayFeedback(true); // Show the feedback
    }

    if (currentWordIndex === shuffledWords.length - 1) {
      setGameOver(true); // if no words left, setGameOver true
    } else {
      setCurrentWordIndex((prevIndex) => prevIndex + 1);
      setUserInput(""); // reset input field

      setTimeout(() => {
        setIsCorrect(null);
        setFeedbackText("");
        setDisplayFeedback(false); // Hide the feedback after 1s
      }, 1000);
    }
  };

  // Show warning when trying to refresh / leave page while game is in progress
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (gameStarted) {
        const message = "Leaving the page will end the game. Are you sure?";
        event.returnValue = message; // Default for most browsers
        return message; // For some older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [gameStarted]);

  // set gamestarted to true when called
  const startGame = () => {
    setGameStarted(true);
  };

  const restartGame = () => {
    // Shuffle the array again when restarting the game
    // Set states to default and reset game score
    setShuffledWords([...allWords].sort(() => Math.random() - 0.5));
    setCurrentWordIndex(0);
    setUserInput("");
    setIsCorrect(null);
    setCorrectCount(0);
    setGameOver(false);
    setFeedbackText("");
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setGameStarted(false);
  };

  //Modifies translatable word so that it starts with a capital letter
  const formatWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  // progresscounter i / total
  const progressCounter = `${currentWordIndex + 1} / ${shuffledWords.length}`;
  const inputRef = useRef(null); // Create a ref to store the input element

  useEffect(() => {
    // Focus on the input element when the component mounts
    // This effect runs only once, on mount
    // This doesnt work when the game is restarted. Fix ??? Used to work???
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Return
  return (
    <div className="App">
      <div>
        <h1>Learn English app!</h1>
        {!gameStarted && (
          <>
            <div className="start1">
              <button className="startgamebutton" onClick={startGame}>
                <b>Start Game</b>
              </button>
            </div>
            <div className="start2">
              {typeof toggleTranslationDirection === "function" && (
                <button
                  className="switchbutton"
                  onClick={toggleTranslationDirection}
                >
                  {translationDirection === "finnishToEnglish"
                    ? "Currently Finnish to English"
                    : "Currently English to Finnish"}
                </button>
              )}
            </div>
          </>
        )}

        {gameStarted && (
          <>
            <div className="progresstext">
              <p>
                Question: {progressCounter}. Correct answers: {correctCount}
              </p>
            </div>

            <div className="thegame-text">
              <p>
                {translationDirection === "finnishToEnglish"
                  ? "Finnish: "
                  : "English: "}{" "}
                <b>{formatWord(getCurrentWord())}</b>
              </p>
            </div>

            <div className="thegame">
              <input
                ref={inputRef}
                type="text"
                placeholder={
                  translationDirection === "finnishToEnglish"
                    ? "English.."
                    : "Finnish.."
                }
                value={userInput}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />

              <button
                className="checkanswerbutton"
                onClick={checkAnswer}
                disabled={displayFeedback}
              >
                Check Answer
              </button>
            </div>

            {isCorrect !== null && (
              <div className="feedback-container">
                <p className={`feedback-text ${!isCorrect ? "incorrect" : ""}`}>
                  {feedbackText}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {gameOver && (
        <div className="endscreen">
          <h2>Thank you for playing!</h2>
          <p>
            Final score: <b>{correctCount}</b> out of{" "}
            <b>{shuffledWords.length}</b>
          </p>
          <button className="restartbutton" onClick={restartGame}>
            Play again
          </button>

          <button
            className="revealbutton"
            onClick={() => setDisplayCorrectAnswers(!displayCorrectAnswers)}
          >
            {displayCorrectAnswers
              ? "Hide Correct Answers"
              : "Reveal Correct Answers"}
          </button>

          {displayCorrectAnswers && correctAnswers.length > 0 && (
            <div>
              <h3>Correct Answers</h3>
              <ul>
                {correctAnswers.map((answer, index) => (
                  <li key={index} style={{ color: "#307533" }}>
                    {answer.finnish} - {answer.english}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="revealbutton"
            onClick={() => setDisplayIncorrectAnswers(!displayIncorrectAnswers)}
          >
            {displayIncorrectAnswers
              ? "Hide Incorrect Answers"
              : "Reveal Incorrect Answers"}
          </button>

          {displayIncorrectAnswers && incorrectAnswers.length > 0 && (
            <div>
              <h3>Incorrect Answers</h3>
              <ul>
                {incorrectAnswers.map((answer, index) => (
                  <li key={index} style={{ color: "#c40202" }}>
                    {answer.finnish} - {answer.english}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
