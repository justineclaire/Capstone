import React, { useState } from 'react'

function FlashcardQA({ flashcards }) {
    const [flip, setFlip] = useState(false)

    return (
        <div className={`mycard ${flip ? 'flip' : ''}`}
        onClick={() => setFlip(!flip)}
        >
            <div className="front">
                {flashcards.question}
            </div>
            <div className="back">{flashcards.answer}</div>
        </div>
    );
}

export default FlashcardQA;