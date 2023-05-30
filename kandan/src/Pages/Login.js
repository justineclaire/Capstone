import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "../App.css";
import { auth } from "../firebase";
import { Message } from 'semantic-ui-react';

function Login() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      setErrorMessage('');
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("The email address is already in use");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("The email address is not valid.");
         
      } else if (error.code === "auth/operation-not-allowed") {
        setErrorMessage("Operation not allowed.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("The password is too weak.");
      }
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setErrorMessage('');
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        setErrorMessage("This email does not have an account, please sign up");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("The email address is not valid.");
      } else if (error.code === "auth/operation-not-allowed") {
        setErrorMessage("Operation not allowed.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password please try again");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  let [authMode, setAuthMode] = useState("signin")
    
    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

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
                  className='form-control mt-1'
                  placeholder="Email..."
                  onChange={(event) => {
                      setLoginEmail(event.target.value);
                  }}
                  />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  className='form-control mt-1'
                  type="password"
                  placeholder="Password..."
                  onChange={(event) => {
                      setLoginPassword(event.target.value);
                  }}
                  />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="button" className="btn btn-primary" onClick={login}>
                  Login
                </button>
                {errorMessage && (
                <Message color='red'>
                    {errorMessage}
                </Message>
                )}
                {/*<h4> User Logged In: </h4>
                {user?.email}*/}
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
              <input placeholder='Email...' type='email'
                  className='form-control mt-1' onChange={(event) => setRegisterEmail(event.target.value)}/>
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password..."
                onChange={(event) => {
                    setRegisterPassword(event.target.value);
                }}
              />
            </div>
            {errorMessage && (
                <Message color='red'>
                    {errorMessage}
                </Message>
            )}
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary" onClick={register}>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    )
    //ahhhh
 
}

export default Login;