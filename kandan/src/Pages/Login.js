import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, } from 'firebase/auth';
import { auth } from "../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import {db} from '../firebase';


export default function Login() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

  
    let [authMode, setAuthMode] = useState("signin")
    
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }
    

    const register = async () => {
      try {
        const res = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        const user = res.user;
        await setDoc(doc(collection(db, "users")), {
          email: user.email,
          uid: user.uid
        });
        console.log("Document added successfully!");
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    };

    const login = async () => {
        try {
        const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    };
    
    /*const testfc = async () => {
      try {
        await setDoc(doc(collection(db, "flashcards")), {
          UID: '2cIHzUhzzbYfEvU9TzRcx89kaO23',
          lang1: 'french',
          lang2: 'english',
          side1: 'bonsoir',
          side2: 'good evening'
        });
        console.log("Document added successfully!");
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    };*/

    const logout = async () => {
        await signOut(auth);
    };
    
    if (authMode === "signin") {
        return (
          <div className="Auth-form-container">
            <form className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                <div className="text-center">
                  Not registered yet?{" "}
                  <span className="link-primary" onClick={changeAuthMode}>
                    Sign Up
                  </span>
                </div>
                <div className="form-group mt-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    value={loginEmail}
                    placeholder="Email..." 
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control mt-1"
                    value={loginPassword}
                    placeholder="Password..."
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary" onClick={login}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )
      }

      return (
        
        <div className="Auth-form-container">
            
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </div>
              
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  value={registerEmail}
                    placeholder="Email..." 
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  value={registerPassword}
                  placeholder="Password..."
                  autoComplete='new-password'
                  onChange={(event) => {
                      setRegisterPassword(event.target.value);
                  }}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={register}>
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      )
}