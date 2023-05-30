import React from "react";
import FlashcardQA from "./FlashcardQA";

function FlashcardList({ flashcards }) {
    return (
        <div className="mycard-grid">
            {flashcards.map(flashcards => {
                return <FlashcardQA flashcards={flashcards} key={flashcards.id} />
            })}
        </div>
    );  
}

export default FlashcardList;