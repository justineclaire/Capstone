import React, { useState, useEffect, useRef, useCallback } from "react";
import FlashcardQA from "./FlashcardQA";
import { collection, updateDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';



function FlashcardList({ flashcards, setFlashcards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(currentIndex);

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
      
      // Fetch the updated flashcards data from Firestore
      const snapshot = await getDocs(collection(db, 'flashcards'));
      const updatedFlashcards = snapshot.docs.map((doc) => ({
        qlang: doc.data().lang1,
        alang: doc.data().lang2,
        question: doc.data().side1,
        answer: doc.data().side2,
        box: doc.data().Box,
        id: doc.id
      }));
      
      // Update the flashcards state with the updated data
      setFlashcards(updatedFlashcards);
    } catch (error) {
      console.error('Error updating box value:', error);
    }
  };
  

  const handleIncrement = useCallback(
    () => {
      const currentFlashcard = flashcards[currentIndex];
  
      // Check if the box value is already 3
      if (currentFlashcard.box === 3) {
        return; // Leave it at three, no need to update Firestore
      } else {
        // Increment the box value
        const updatedBox = currentFlashcard.box + 1;
  
        incrementBoxValue(currentFlashcard.id, updatedBox);
      }
    },
    [flashcards]
  );


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
    if (currentFlashcard.box === 1) {
      return; // Leave it at one, no need to update Firestore
    } else {
      // Decrement the box value
      const updatedBox = currentFlashcard.box - 1;

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
      <div className="card-navigation">
        <button onClick={handlePrevFlashcard}>Previous</button>
        <button onClick={handleNextFlashcard}>Next</button>
        <button onClick={handleIncrement}>Correct</button> 
        <button onClick={handleDecrement}>Incorrect</button>
      </div>
    </div>
  );

}

export default FlashcardList;
