import service from "./service";

function auth(email, senha){
    return new Promise((resolve, reject) => {
        service.post('/login', {email, senha})
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    })
}

function saveAuthInfo(user, token){
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
}

function getAuthInfo(type){
    if(type === "user"){
        return localStorage.getItem("user")
    }else{
        return  localStorage.getItem("token");
    }
}

function logout(){
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    directToLogin()
}

function directToLogin(){
    window.open('/login', '_self')
}

function isLogged(){
    return !!localStorage.getItem('token');
}

function validateAth(){
    if(window.location.pathname === "'/login"){
        if(isLogged()){
            window.open('/cadastrations', '_self')
        }
    }else if(!isLogged() && window.location.pathname !== "/login"){
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