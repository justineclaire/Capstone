import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Form,
    TextArea,
    Button,
    Icon,
    Segment
} from 'semantic-ui-react';
import { auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import {db} from '../firebase';


export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [detectLanguageKey, setdetectedLanguageKey] = useState('');
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])
    const [resultText, setResultText] = useState('');

    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText
        })
            .then((response) => {
                setdetectedLanguageKey(response.data[0].language)
            })
    }

    useEffect(() => {
        axios.get(`https://libretranslate.de/languages`)
        .then((response) => {
         setLanguagesList(response.data)
        })
 
        getLanguageSource()
     }, [inputText])

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }

    const translateText = () => {
        getLanguageSource();

        let data = {
            q : inputText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setResultText(response.data.translatedText)
        })
    }

    const addFC = async (e) => {
    
    }


    return (
        <div>
            <div className='app-body'>
                <div className='container'>
                   <Form>
                    <Form.Field
                       control={TextArea}
                        placeholder='Type Text to Translate..'
                        onChange={(e) => setInputText(e.target.value)}/>

                        <select className="language-select" onChange={languageKey}>
                            <option>Please Select Language..</option>
                            {languagesList.map((language) => {
                                return (
                                    <option value={language.code}>
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

                        <Segment.Inline>
                        <Button
                            color= "olive"
                            size="large"
                            onClick={translateText}
                        >
                            <Icon name='translate' />
                            Translate</Button>
                    
                        <Button 
                            color= "green"
                            size="large"
                        >
                            Create flashcard from translation
                        </Button>

                        </Segment.Inline>
                        
                    </Form>
                </div>
            </div>
        </div>
    )
}