import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import '../App.css';

function Newcard() {
  const [lang1, setLang1] = useState('');
  const [lang2, setLang2] = useState('');
  const [side1, setSide1] = useState('');
  const [side2, setSide2] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCreateFlashcard = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('User not logged in');
      return;
    }

    const flashcard = {
      UID: user.uid,
      lang1,
      lang2,
      side1,
      side2,
    };

    try {
      await addDoc(collection(db, 'flashcards'), flashcard);
      console.log('Flashcard created successfully');
      // Reset the form inputs
      setLang1('');
      setLang2('');
      setSide1('');
      setSide2('');
    } catch (error) {
      console.error('Error creating flashcard: ', error);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleCreateFlashcard}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create Flashcard</h3>
          <div className="form-group mt-3">
            <label htmlFor="lang1">Language 1:</label>
            <input
              type="text"
              id="lang1"
              className="form-control mt-1"
              placeholder="Language 1..."
              value={lang1}
              onChange={(e) => setLang1(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="lang2">Language 2:</label>
            <input
              type="text"
              id="lang2"
              className="form-control mt-1"
              placeholder="Language 2..."
              value={lang2}
              onChange={(e) => setLang2(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="side1">Side 1:</label>
            <input
              type="text"
              id="side1"
              className="form-control mt-1"
              placeholder="Side 1..."
              value={side1}
              onChange={(e) => setSide1(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="side2">Side 2:</label>
            <input
              type="text"
              id="side2"
              className="form-control mt-1"
              placeholder="Side 2..."
              value={side2}
              onChange={(e) => setSide2(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Create Flashcard
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Newcard;
