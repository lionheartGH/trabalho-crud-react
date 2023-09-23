import service from "./service";

function auth(email, senha) {
    return new Promise((resolve, reject) => {
        service.post('/login', { email, senha })
            .then(response => resolve(response))
            .catch(erro => reject(erro))
    })
}

function saveAuthInfo(user, token) {
    if (localStorage.getItem("rememberMe") === "true") {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
    } else {
        sessionStorage.setItem("user", JSON.stringify(user))
        sessionStorage.setItem("token", token)
    }
}

function getAuthInfo(type) {
    if (type === "user") {
        if(localStorage.getItem("rememberMe") === "true"){
            return localStorage.getItem("user")
        }else{
            return sessionStorage.getItem("user")
        }
    } else {
        if(localStorage.getItem("rememberMe") === "true"){
            return  localStorage.getItem("token")
        }else{
            return sessionStorage.getItem("token")
        }
    }
}

function logout() {
    if(localStorage.getItem("rememberMe") === "true"){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }else{
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
    }
    directToLogin()
}

function directToLogin() {
    window.open('/login', '_self')
}

function isLogged() {
    return !!getAuthInfo('token');
}

function validateAth() {
    if (window.location.pathname === "'/login") {
        if (isLogged()) {
            window.open('/cadastrations', '_self')
        }
    } else if (!isLogged() && window.location.pathname !== "/login") {
        directToLogin()
    }
}

export default {
    auth,
    saveAuthInfo,
    getAuthInfo,
    logout,
    directToLogin,
    isLogged,
    validateAth
}