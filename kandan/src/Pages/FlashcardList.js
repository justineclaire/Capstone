import React, { useState } from "react";
import FlashcardQA from "./FlashcardQA";

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1));
  };

  const handleNextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  return (
    <div className="mycard-grid">
      {flashcards.length > 0 ? (
        <FlashcardQA flashcards={flashcards[currentIndex]} />
      ) : (
        <p>No flashcards available.</p>
      )}
      <div className="mycard-navigation">
        <button className="prevnext" onClick={handlePrevFlashcard}>Previous</button>
        <button className="prevnext" onClick={handleNextFlashcard}>Next</button>
      </div>
    </div>
  );

}

export default FlashcardList;
