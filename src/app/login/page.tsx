"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './log.css'
const LoginRegister: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [error, setError] = useState('');
    const [registerUserName, setRegisterUsername] = useState('');
    const [registerLastName, setRegisterLastName] = useState('');

    const loginBtnRef = useRef<HTMLButtonElement>(null);
    const registerBtnRef = useRef<HTMLButtonElement>(null);
    const loginRef = useRef<HTMLDivElement>(null);
    const registerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
 
    useEffect(() => {
        if (loginRef.current && registerRef.current) {
            if (isLogin) {
                loginRef.current.style.left = "4px";
                registerRef.current.style.right = "-520px";
                loginBtnRef.current?.classList.add("white-btn");
                registerBtnRef.current?.classList.remove("white-btn");
                loginRef.current.style.opacity = "1";
                registerRef.current.style.opacity = "0";
            } else {
                loginRef.current.style.left = "-510px";
                registerRef.current.style.right = "5px";
                loginBtnRef.current?.classList.remove("white-btn");
                registerBtnRef.current?.classList.add("white-btn");
                loginRef.current.style.opacity = "0";
                registerRef.current.style.opacity = "1";
            }
        }
    }, [isLogin]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: loginEmail,
                    password: loginPassword,
                }),
            });
            const data = await response.json();
            if (data.jwt) {
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('username', data.user.username);
                alert('Login successful');
                window.location.href = '/';
                
            } else {
                alert("Wrong E-mail or Password");
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred during login');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: registerUserName, // Use email as username
                    lastname: registerLastName,
                    email: registerEmail,
                    password: registerPassword,
                }),
            });
            const data = await response.json();
            if (data.jwt) {
                localStorage.setItem('token', data.jwt);
                alert('Registration successful');
            } else {
                setError(data.message[0].messages[0].message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setError('An error occurred during registration');
        }
    };

    return (
        <>

            <div className="wrapper">
                <nav className="nav">
                    <div className="nav-logo">
                    <a href="/"><img src="/evertours.svg" alt="Evertours Logo" width={100} height={50} /></a>
                    </div>
                    <div className="nav-button">
                        <button className="btn white-btn" id="loginBtn" onClick={() => setIsLogin(true)} ref={loginBtnRef}>Log In</button>
                        <button className="btn" id="registerBtn" onClick={() => setIsLogin(false)} ref={registerBtnRef}>Sign Up</button>
                    </div>
                </nav>

                <div className="form-box">
                    <div className="login-container" id="login" ref={loginRef}>
                        <form onSubmit={handleLogin}>
                            <div className="top">
                                <header>Login</header>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Username or Email"
                                    name="identifier"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}

                                />
                                <i className="bx bx-user"></i>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Password"
                                    name="password"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}

                                />
                                <i className="bx bx-lock-alt"></i>
                            </div>
                            <div className="input-box">
                                <input type="submit" className="submit" value="Sign here" />
                            </div>
                            <div className="two-col">
                                <div className="one">
                                    <input type="checkbox" id="login-check" />
                                    <label htmlFor="login-check"> Remember Me</label>
                                </div>
                                <div className="two">
                                    <label><a href="#">Forgot password?</a></label>
                                </div>
                            </div>
                            <div className="top">
                                <span style={{ marginTop: '50px' }}>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Sign Up</a></span>
                            </div>
                        </form>
                    </div>

                    <div className="register-container" id="register" ref={registerRef}>
                        <form onSubmit={handleRegister}>
                            <div className="top">
                                <header>Sign Up</header>
                            </div>
                            <div className="two-forms">
                                <div className="input-box">
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Firstname"
                                        name="username"
                                        onChange={(e) => setRegisterUsername(e.target.value)}

                                    />
                                    <i className="bx bx-user"></i>
                                </div>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Lastname"
                                        name="lastname"
                                        onChange={(e) => setRegisterLastName(e.target.value)}
                                    />
                                    <i className="bx bx-user"></i>
                                </div>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Email"
                                    name="email"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}

                                />
                                <i className="bx bx-envelope"></i>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Password"
                                    name="password"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}

                                />
                                <i className="bx bx-lock-alt"></i>
                            </div>
                            <div className="input-box">
                                <input type="submit" className="submit" value="Register" />
                            </div>
                            <div className="two-col">
                                <div className="one">
                                    <input type="checkbox" id="register-check" />
                                    <label htmlFor="register-check"> Remember Me</label>
                                </div>
                            </div>
                            <div className="top">
                                <span>Have an account? <a href="#" onClick={() => setIsLogin(true)}>Login</a></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginRegister;