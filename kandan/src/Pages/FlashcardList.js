import React, { useState } from "react";
import FlashcardQA from "./FlashcardQA";
import { collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1));
  };

  const handleNextFlashcard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const incrementBoxValue = async (flashcardId, updatedBox) => {
    try {
      const flashcardDocRef = doc(db, 'flashcards', flashcardId);
      await updateDoc(flashcardDocRef, { Box: updatedBox });
      console.log('Box value updated successfully!');
    } catch (error) {
      console.error('Error updating box value:', error);
    }
  };

  const handleIncrement = () => {
    const currentFlashcard = flashcards[currentIndex];

    // Check if the box value is already 3
    if (currentFlashcard.Box === 3) {
        return; // Leave it at three, no need to update Firestore
    }
    else {
        // Increment the box value
        const updatedBox = currentFlashcard.Box + 1;

        incrementBoxValue(currentFlashcard.id, updatedBox);
    }
    
  };


  const decrementBoxValue = async (flashcardId, updatedBox) => {
    try {
        const flashcardDocRef = doc(db, 'flashcards', flashcardId);
        await updateDoc(flashcardDocRef, { Box: updatedBox });
        console.log('Box value updated successfully!');
      } catch (error) {
        console.error('Error updating box value:', error);
      }
  };


  const handleDecrement = () => {
    const currentFlashcard = flashcards[currentIndex];

    // Check if the box value is already 1
    if (currentFlashcard.Box === 1) {
        return; // Leave it at one, no need to update Firestore
    }
    else {
        // Decrement the box value
        const updatedBox = currentFlashcard.Box - 1;

        decrementBoxValue(currentFlashcard.id, updatedBox);
    }
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

      <div className="card-navigation">
        <button onClick={handlePrevFlashcard}>Previous</button>
        <button onClick={handleNextFlashcard}>Next</button>
        <button onClick={handleIncrement}>Increment</button> 
        <button onClick={handleDecrement}>Decrement</button>

      </div>
    </div>
  );

}

export default FlashcardList;
