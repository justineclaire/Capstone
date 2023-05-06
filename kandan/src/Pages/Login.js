import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, } from 'firebase/auth';
import { auth } from "../firebase";

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
    

    const register = async () => {
        try {
        const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
        } catch (error) {
            console.log(error.message);
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

    const logout = async () => {
        await signOut(auth);
    };
    
    return (
        <div>
            <div className="app-header">
                <h2 className="header">Kandan Translator</h2>
            </div>

            <div className='app-body'>
                <div className='register-user'>
                    <h3> Register User </h3>
                    <input 
                        value={registerEmail}
                        placeholder="Email..." 
                        onChange={(event) => {
                            setRegisterEmail(event.target.value);
                        }}   
                    />
                    <input 
                        value={registerPassword}
                        placeholder="Password..."
                        onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }}
                    />

                    <button onClick={register}> Create User </button>
                </div>

                <div className='login-user'>
                    <h3> Existing User Login </h3>
                    <input 
                        value={loginEmail}
                        placeholder="Email..." 
                        onChange={(event) => {
                            setLoginEmail(event.target.value);
                        }}
                    />
                    <input 
                        value={loginPassword}
                        placeholder="Password..."
                        onChange={(event) => {
                            setLoginPassword(event.target.value);
                        }}
                    />

                    <button onClick={login}> Login </button>
                </div>

                <div>
                    <h4> User logged in: </h4>
                    {user?.email}
                </div>
                
                <div>
                    <button onClick={logout}> Sign Out </button>
                </div>
            </div>
        </div>
    )

}