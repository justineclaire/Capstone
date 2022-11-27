import React from "react";

function Flashcards({ flashcard }) {
    return (
        <div className="page">
            {flashcard.question}
        </div>
    );
}

export default Flashcards;