import service from "./service"

function getCadastrations(){
    return new Promise((resolve, reject) => {
        service.get('/clientes')
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    })
}

function addC(cadastration){
    cadastration.dataCadastro = new Date().toISOString()
    return new Promise((resolve, reject) => {
        service.post('/clientes', cadastration)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    })
}

function updateC(cadastration){
    return new Promise((resolve, reject) => {
        service.put(`/clientes/${cadastration.id}`, cadastration)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    })
}

function deleteC(id){
    return new Promise((resolve, reject) => {
        service.delete(`/clientes/${id}`)
        .then(response => resolve(response))
        .catch(erro => reject(erro))
    })
}

export default {
    getCadastrations,
    addC,
    updateC,
    deleteC
}