import '../../styles/home.css'
import userService from '../../services/userService'
import cadastrationService from '../../services/cadastrationService';
import productService from '../../services/productService'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function Home() {

    const [cadastrations, setCadastrations] = useState([])
    const [products, setProducts] = useState([])

    const getUser = () => {
        return JSON.parse(userService.getAuthInfo('user'));
    }

    useEffect(() => {
        cadastrationService.getCadastrations()
            .then(response => {
                setCadastrations(response.data)
            })
            .catch(error => console.log(error))
    })

    useEffect(() => {
        productService.getProducts()
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => console.log(error))
    })

    function avarageShopping() {
        let array = []
        let sum = 0
        let i = 0

        cadastrations.forEach(cadastration => {
            array = [...array, cadastration.shopping];
        })
        for (i = 0; i < array.length; i++) {
            sum += parseInt(array[i])
        }
        return (sum / array.length).toFixed(1)
    }

    function avarageStock() {
        let array = []
        let sum = 0
        let i = 0

        products.forEach(product => {
            array = [...array, product.quantidadeEstoque];
        })
        for (i = 0; i < array.length; i++) {
            sum += parseInt(array[i])
        }
        return (sum / array.length).toFixed(1)
    }

    return (
        <div className='home-root' style={{
            backgroundColor: sessionStorage.getItem("dark") === "true" ? "var(--background-color)" : "var(--background-color-light)",
            height: 'calc(100% - 45px)',
        }}
            data-bs-theme={sessionStorage.getItem("dark") === "true" ? "dark" : "light"}>
            <div className='container-root'>
                <div className="row mt-3">
                    <div className="col-sm-12">
                        <h4 style={{ fontSize: '26px', color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>
                            {`Bem vindo, ${getUser().nome}`}
                        </h4>
                        <hr style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }} />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col'>
                        <div className='cadastrations-info-root p-3'
                            style={{ boxShadow: sessionStorage.getItem("dark") === "true" ? "0 0 3px 1px rgba(var(--darkmode-shadow), 0.8)" : "0 0 3px 1px rgba(var(--lightmode-shadow), 0.8)",
                            backgroundColor: sessionStorage.getItem("dark") === "true" ? "var(--main-color)" : "white",
                            }}>
                            <i style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>{`Clientes cadastrados: ${cadastrations.length}`}</i>
                            <i style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>{`Média de compras: ${avarageShopping()}`}</i>
                            <div className="row mt-3 m-3 mb-0">
                                <Link to='/cadastros'>
                                    <button id="add-bt-home" className="btn btn-secondary btn-sm"
                                    >Criar novo cadastro</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='products-info-root p-3'
                            style={{ boxShadow: sessionStorage.getItem("dark") === "true" ? "0 0 3px 1px rgba(var(--darkmode-shadow), 0.8)" : "0 0 3px 1px rgba(var(--lightmode-shadow), 0.8)",
                            backgroundColor: sessionStorage.getItem("dark") === "true" ? "var(--main-color)" : "white",
                            }}>
                            <i style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>{`Produtos cadastrados: ${products.length}`}</i>
                            <i style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>{`Média de estoque: ${avarageStock()}`}</i>
                            <div className="row mt-3 m-3 mb-0">
                                <Link to='/produtos'>
                                    <button id="add-bt-home" className="btn btn-secondary btn-sm"
                                    >Criar novo produto</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}