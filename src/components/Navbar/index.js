import '../../styles/navbar.css'
import { Link, useLocation } from 'react-router-dom'
import userService from '../../services/userService';
import { Avatar } from '@mui/material';
import { useState } from 'react';

export default function Navbar() {

    let location = useLocation()

    const [darkMode, setDarkMode] = useState((sessionStorage.getItem("dark") === "true" ? true : false) || false)
    const [hoverExit, setHoverExit] = useState(false)

    const toggleDark = () => {
        sessionStorage.setItem("dark", !darkMode)
        setDarkMode(!darkMode);
    }

    const getUser = () => {
        return JSON.parse(userService.getAuthInfo('user'));
    }

    const logout = () => {
        userService.logout()
    }
    if (location.pathname !== '/login') {
        return (
            <ul className='navbar-root'
            style={{
                backgroundColor: darkMode ? "var(--main-color)" : "var(--main-color-dark)",
                boxShadow: darkMode ? "0 0 3px 1px rgba(var(--darkmode-shadow), 0.8)" : "0 0 3px 1px rgba(var(--lightmode-shadow), 0.8)"
                }}>
                <div className='navbar-left'>
                    <h1 className='logo-navbar' style={{color: darkMode ? "white" : "black"}}>𝕏</h1>
                    <li className='page-item'><Link to='/'
                        style={{
                            backgroundColor: location.pathname === "/" ? (darkMode ? "var(--button-color)" : "var(--button-color-light)") : "transparent",
                            color: darkMode ? "white" : "black"
                        }}
                    >Home</Link></li>
                    <li className='page-item'><Link to='/cadastros'
                        style={{
                            backgroundColor: location.pathname === "/cadastros" ? (darkMode ? "var(--button-color)" : "var(--button-color-light)") : "transparent",
                            color: darkMode ? "white" : "black"
                        }}
                    >Cadastros</Link></li>
                    <li className='page-item'><Link to='/produtos'
                        style={{
                            backgroundColor: location.pathname === "/produtos" ? (darkMode ? "var(--button-color)" : "var(--button-color-light)") : "transparent",
                            color: darkMode ? "white" : "black"
                        }}
                    >Produtos</Link></li>
                </div>
                <div className='navbar-right'>
                    <div className="toggle-dark-navbar" onClick={toggleDark} style={{ color: darkMode ? "#fff" : "#000" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-moon" viewBox="0 0 16 16" style={{ display: darkMode ? "none" : "block" }}>
                            <path
                                d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16" style={{ display: darkMode ? "block" : "none" }}>
                            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                        </svg>
                    </div>
                    <i className="loggedUser" style={{color: darkMode ? "white" : "black"}}>{getUser().email}</i>
                    <Avatar className='avatar' alt={getUser().nome} src={getUser().foto} sx={{ width: 30, height: 30 }} />
                    <li onClick={logout} className="logout" style={{backgroundColor: hoverExit ? (darkMode ? "var(--button-color)" : "var(--button-color-light)") : "transparent"}}
                    onMouseEnter={() => setHoverExit(true)}
                    onMouseLeave={() => setHoverExit(false)}
                    >
                        <a href="/login.html" style={{color: hoverExit ? "red" : (darkMode ? "white" : "black")}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-door-open" viewBox="0 0 16 16">
                                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                <path
                                    d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                            </svg>
                        </a>
                    </li>
                </div>
            </ul>
        )
    } else {
        return null
    }
}