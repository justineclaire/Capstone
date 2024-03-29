import React, { useState, useEffect, useRef, useCallback } from "react";
import FlashcardQA from "./FlashcardQA";
import { Icon, Input } from 'semantic-ui-react';
import { collection, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';



function FlashcardList({ flashcards, setFlashcards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [user, setUser] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [filteredFlashcards, setFilteredFlashcards] = useState([]);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
    
        return () => {
          unsubscribe();
        };
      }, []);

    useEffect(() => {
        const filteredFlashcards = flashcards.filter((flashcard) =>
            selectedLanguage
            ? flashcard.qlang === selectedLanguage || flashcard.alang === selectedLanguage
            : true
        );
        setFilteredFlashcards(filteredFlashcards);
    }, [flashcards, selectedLanguage]);
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
      
      const flashcardsCollection = collection(db, "flashcards");
        const flashcardsQuery = query(
          flashcardsCollection,
          where('UID', '==', user.uid)
        );
       const snapshot = await getDocs(flashcardsQuery);
     const updatedFlashcards = snapshot.docs.map((doc) => ({
        qlang: doc.data().lang1,
        alang: doc.data().lang2,
        question: doc.data().side1,
        answer: doc.data().side2,
        box: doc.data().Box,
        id: doc.id
      }));
      // Sort the flashcards by box value in ascending order
      const sortedFlashcards = updatedFlashcards.sort((a, b) => a.box - b.box);
      setFlashcards(sortedFlashcards);
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
  
        // Use the useCallback hook to memoize the handleIncrement function
        // This will prevent it from being re-rendered unnecessarily
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
      
      const flashcardsCollection = collection(db, "flashcards");
        const flashcardsQuery = query(
          flashcardsCollection,
          where('UID', '==', user.uid)
        );
       const snapshot = await getDocs(flashcardsQuery);
      // Fetch the updated flashcards data from Firestore
      const updatedFlashcards = snapshot.docs.map((doc) => ({
        qlang: doc.data().lang1,
        alang: doc.data().lang2,
        question: doc.data().side1,
        answer: doc.data().side2,
        box: doc.data().Box,
        id: doc.id
      }));
      
        // Sort the flashcards by box value in ascending order
        const sortedFlashcards = updatedFlashcards.sort((a, b) => a.box - b.box);
        setFlashcards(sortedFlashcards);
    
    } catch (error) {
      console.error('Error updating box value:', error);
    }
  };


  const handleDecrement = useCallback(
    () => {
      const currentFlashcard = flashcards[currentIndex];
  
      // Check if the box value is already 1
      if (currentFlashcard.box === 1) {
        return; // Leave it at one, no need to update Firestore
      } else {
        // Decrement the box value
        const updatedBox = currentFlashcard.box - 1;
  
        // Use the useCallback hook to memoize the handleDecrement function
        // This will prevent it from being re-rendered unnecessarily
        decrementBoxValue(currentFlashcard.id, updatedBox);
      }
    },
    [flashcards]
  );
  
  const sortedFlashcards = [flashcards].sort((a, b) => a.box - b.box);
  return (
    <div className="mycard-grid">
      {filteredFlashcards.length > 0 ? (
        <FlashcardQA flashcards={filteredFlashcards[currentIndex]} />
      ) : (
        <p>No flashcards available.</p>
      )}

      <div className="mycard-navigation">
        <button className="prevnext" onClick={handlePrevFlashcard}><Icon name='angle double left' />Previous</button>
        <button className="prevnext" onClick={handleNextFlashcard}>Next <Icon name='angle double right' /></button>
        <button className="myincr" onClick={handleIncrement}><Icon name='check' />Correct</button> 
        <button className="mydecr" onClick={handleDecrement}><Icon name='x' />Incorrect</button>
        <Input
        className="prevnext"
        placeholder="Search by language"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      />
      </div>  
      

    </div>
  );

}

export default FlashcardList;