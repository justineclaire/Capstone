import React, { useState } from "react";
import FlashcardList from './FlashcardList';

function Flashcards() {
    const [flashcards, setFlashcards] = useState(TEST_FLASHCARDS)
    return (
      <div className="mycontainer">
          <FlashcardList flashcards={flashcards} />
      </div>
    );
}

const TEST_FLASHCARDS = [
    {
      id: 1,
      question: '사과',
      answer: 'Apple',
    }
  ]

export default Flashcards;