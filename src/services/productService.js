import service from "./service"

function getProducts(){
    return new Promise((resolve, reject) => {
        service.get('/produtos')
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

function addP(product){
    product.dataCadastro = new Date().toISOString()
    return new Promise((resolve, reject) => {
        service.post('/produtos', product)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

function updateP(product){
    return new Promise((resolve, reject) => {
        service.put(`/produtos/${product.id}`, product)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

function deleteP(id){
    return new Promise((resolve, reject) => {
        service.delete(`/produtos/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

export default {
    getProducts,
    addP,
    updateP,
    deleteP
}