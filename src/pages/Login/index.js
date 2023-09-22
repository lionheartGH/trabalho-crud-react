import { useState } from "react";
import '../../styles/login.css'

import userService from "../../services/userService";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, setDarkMode] = useState((sessionStorage.getItem("dark") === "true" ? true : false) || false)
    const [showError, setShowError] = useState('')
    const [showLoading, setShowLoading] = useState(false)

    const toggleDark = () => {
        sessionStorage.setItem("dark", !darkMode)
        setDarkMode(!darkMode);
    }

    function Enter() {
        if (!email || !password) {
            if (!email) {
                setShowError("noEmail")
            }
            if (!password) {
                setShowError("noPassword")
            }
            if (!email && !password) {
                setShowError("noText")
            }
            return
        }
        userService.auth(email, password)
        .then(response => {
            console.log(response)
            userService.saveAuthInfo(response.data.usuario, response.data.token)
            setShowLoading(true)
            setTimeout(() => {
                sessionStorage.setItem("dark", darkMode)
                window.location="/"
            }, 1000)
        })
        .catch(error => {
            console.log(error)
            setShowError('auth')
        })
    }

    return (
        <div className="login-root" data-bs-theme={darkMode ? "dark" : "light"}>
            <div className="toggle-dark" onClick={toggleDark} style={{ color: darkMode ? "#fff" : "#000" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="bi bi-moon" viewBox="0 0 16 16" style={{ display: darkMode ? "none" : "block" }}>
                    <path
                        d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16" style={{ display: darkMode ? "block" : "none" }}>
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                </svg>
            </div>
            <div className="background" id="background"
                style={{ backgroundImage: darkMode ? "linear-gradient(to bottom right, #1c1c1c 50%, #353535 50%)" : "linear-gradient(to bottom right, #f6f6f6 50%, #d1d1d1 50%)" }}>
                <div className="container"
                    style={{ backgroundColor: darkMode ? "#262626" : "#fff", boxShadow: darkMode ? "0 0 3px 1px rgba(255, 255, 255, 0.8)" : "0 0 3px 1px rgba(0, 0, 0, 0.8)" }}>
                    <div className="logo"
                        style={{ color: darkMode ? "#fff" : "#000" }}>
                        <h1>𝕏</h1>
                        <h2 style={{fontSize: "10px"}}>{email + password}</h2>
                    </div>
                    <div className="error"
                        style={{ backgroundColor: darkMode ? "#5e3131" : "#ff9494", color: darkMode ? "rgba(255,255,255,255.8)" : "rgba(0,0,0,0.8)",
                        display: showError !== "" ? "flex" : "none",
                        height: showError === "noText" ? "40px" : "30px"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-info-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                        <i id="error-msg">{
                        showError === "auth" ? 'Usuário ou senha inválidos'
                        : (showError === "noEmail" ? "Por favor, digite um e-mail válido."
                        : (showError === "noPassword" ? "Por favor, digite uma senha válida."
                        : "Por favor, digite um e-mail e senha válidos."))}</i>
                    </div>
                    <div className="email-input">
                        <label htmlFor="email" style={{ color: darkMode ? "#fff" : "#000" }}>E-mail:</label>
                        <input id="email" type="email" placeholder="exemplo@exemplo.com"
                            style={{ color: darkMode ? "#fff" : "#000", backgroundColor: darkMode ? "#4f4f4f" : "#d1d1d1" }}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setShowError("")   
                            }}
                        />
                    </div>
                    <div className="password-input">
                        <label htmlFor="password" style={{ color: darkMode ? "#fff" : "#000" }}>Senha:</label>
                        <input id="password" type="password" placeholder="Digite sua senha"
                            style={{ color: darkMode ? "#fff" : "#000", backgroundColor: darkMode ? "#4f4f4f" : "#d1d1d1" }}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setShowError("")
                            }}
                        />
                    </div>
                    <div className="login-bt">
                        <button type="button" className="btn btn-dark login-bt" id="login-bt"
                        style={{ boxShadow: darkMode ? "0 0 3px 1px rgba(255, 255, 255, 0.8)" : "0 0 3px 1px rgba(0, 0, 0, 0.8)" }}
                        onClick={Enter}
                        >Entrar</button>
                    </div>
                </div>
                <div className="loading" style={{display: showLoading ? "block" : "none"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
                        style={{ margin: "auto", background: "none", display: "block", shapeRendering: "auto" }} width="200px"
                        height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <g transform="rotate(0 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(36 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(72 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.7s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(108 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(144 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(180 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(216 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(252 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.2s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(288 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.1s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                        <g transform="rotate(324 50 50)">
                            <rect x="45" y="25" rx="5" ry="5" width="10" height="10" fill="#4d4d4d">
                                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s"
                                    repeatCount="indefinite"></animate>
                            </rect>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}