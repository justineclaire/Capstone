import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Form,
    TextArea,
    Button,
    Icon,
    Segment,
    Message
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';


export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [detectLanguageKey, setDetectedLanguageKey] = useState('');
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])
    const [resultText, setResultText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText
        })
            .then((response) => {
                setDetectedLanguageKey(response.data[0].language)
            })
    }

    useEffect(() => {
        axios.get(`https://libretranslate.de/languages`)
        .then((response) => {
            setLanguagesList(response.data)
        })

        getLanguageSource();
    }, [inputText])

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }

    const translateText = () => {
        getLanguageSource();

        let data = {
            q: inputText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.de/translate`, data)
            .then((response) => {
                setResultText(response.data.translatedText)
            })
    }

    const addFC = async (e) => {
        e.preventDefault();

        const currentUser = auth.currentUser;
        if (!currentUser) {
            setErrorMessage("Please login first");
            return;
        }

        const flashcard = {
            UID: currentUser.uid,
            lang1: detectLanguageKey,
            lang2: selectedLanguageKey,
            side1: inputText,
            side2: resultText
        };

        try {
            await addDoc(collection(db, "flashcards"), flashcard);
            console.log("Flashcard added successfully");
        } catch (error) {
            console.error("Error adding flashcard: ", error);
        }
    }


    return (
        <div>
            <div className='app-body'>
                <div className='container'>
                    <Form>
                        <Form.Field
                            control={TextArea}
                            placeholder='Type Text to Translate..'
                            onChange={(e) => setInputText(e.target.value)}
                        />

                        <select className="language-select" onChange={languageKey}>
                            <option>Please Select Language..</option>
                            {languagesList.map((language) => {
                                return (
                                    <option value={language.code} key={language.code}>
                                        {language.name}
                                    </option>
                                )
                            })}
                        </select>

                        <Form.Field
                            control={TextArea}
                            placeholder='Your Result Translation..'
                            value={resultText}
                        />

                        {errorMessage && (
                            <Message color='red'>
                                {errorMessage}
                            </Message>
                        )}

                        <Segment.Inline>
                            <Button
                                color="olive"
                                size="large"
                                onClick={translateText}
                            >
                                <Icon name='translate' />
                                Translate
                            </Button>

                            <Button
                                color="green"
                                size="large"
                                onClick={addFC}
                            >
                                Create flashcard from translation
                            </Button>
                            <Link to="/Newcard">
                            <Button
                             color="olive"
                             size="large"
                            >Manually Create Flashcard</Button>
                            </Link>
                        </Segment.Inline>

                    </Form>
                </div>
            </div>
        </div>
    )
}