import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import '../App.css';

function Flashcards() {
  const [user, setUser] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSide2, setShowSide2] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!user) {
        console.error('User not logged in');
        return;
      }

      const flashcardsRef = collection(db, 'flashcards');
      const flashcardsQuery = query(
        flashcardsRef,
        where('UID', '==', user.uid)
      );

      const snapshot = await getDocs(flashcardsQuery);
      const fetchedFlashcards = snapshot.docs.map((doc) => doc.data());

      setFlashcards(fetchedFlashcards);
      setCurrentIndex(0);
      setShowSide2(false);
    };

    fetchFlashcards();
  }, [user]);

  const handlePrevFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    setShowSide2(false);
  };

  const handleNextFlashcard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? prevIndex : prevIndex + 1
    );
    setShowSide2(false);
  };

  const handleToggleSide = () => {
    setShowSide2((prevShowSide2) => !prevShowSide2);
  };

  const handleIncreaseBox = () => {
    const currentFlashcard = flashcards[currentIndex];
    const currentBox = currentFlashcard.Box;

    if (currentBox < 3) {
      currentFlashcard.Box = currentBox + 1;
      // Update the flashcard in the database
      // ...

      // Update the state
      setFlashcards((prevFlashcards) => {
        const updatedFlashcards = [...prevFlashcards];
        updatedFlashcards[currentIndex] = currentFlashcard;
        return updatedFlashcards;
      });
    }
  };

  const handleDecreaseBox = () => {
    const currentFlashcard = flashcards[currentIndex];
    const currentBox = currentFlashcard.Box;

    if (currentBox > 1) {
      currentFlashcard.Box = currentBox - 1;
      // Update the flashcard in the database
      // ...

      // Update the state
      setFlashcards((prevFlashcards) => {
        const updatedFlashcards = [...prevFlashcards];
        updatedFlashcards[currentIndex] = currentFlashcard;
        return updatedFlashcards;
      });
    }
  };

  if (!flashcards.length) {
    return (
      <div className="Flashcards-container">
        <p>No flashcards found.</p>
      </div>
    );
  }

  const currentFlashcard = flashcards[currentIndex];
  const { lang1, lang2, side1, side2 } = currentFlashcard;

  return (
    <div className="Flashcards-container">
      <div className="Flashcard">
        <div className="Flashcard-content">
          {showSide2 ? (
            <h3>{`${lang2}: ${side2}`}</h3>
          ) : (
            <h3>{`${lang1}: ${side1}`}</h3>
          )}
        </div>
        <div className="Flashcard-controls">
          <button
            className="Flashcard-control-btn"
            onClick={handleToggleSide}
          >
            Show {showSide2 ? lang1 : lang2}
          </button>
        </div>
      </div>
      <div className="Navigation-buttons">
        <button onClick={handlePrevFlashcard}>Previous</button>
        <button onClick={handleNextFlashcard}>Next</button>
      </div>
      <div>
        <button onClick={handleDecreaseBox}>Cross</button>
        <button onClick={handleIncreaseBox}>Tick</button>
      </div>
    </div>
  );
}

export default Flashcards;
