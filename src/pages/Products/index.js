import '../../styles/products.css'
import productService from '../../services/productService.js'
import Product from '../../models/product'
import Swal from 'sweetalert2'

import { useEffect, useState, } from 'react'

export default function Products() {

    const [products, setProducts] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [product, setProduct] = useState(new Product())
    const [filterValue, setFilterValue] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [showError, setShowError] = useState('')

    useEffect(() => {
        productService.getProducts()
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => console.log(error))
    })

    useEffect(() => {
        handleFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterValue])

    function editP(id) {
        setEditMode(true)
        setProduct(products.find(p => p.id === id))
    }

    function deleteP(id) {
        let product = products.find(p => p.id === id)
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Deseja realmente deletar o produto ${product.nome}`)) {
            deleteBE(product.id)
        }
    }

    function addP() {
        setEditMode(false)
        cleanForm()
    }

    function deleteBE(id) {
        productService.deleteP(id)
            .then(() => {
                updateOnTable(products.find(p => p.id === id), true)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Produto deletado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: 'alert-top',
                    imageHeight: 30,
                    backdrop: false
                })
            })
            .catch(error => console.log(error))
    }

    function updateOnTable(productToUpdate, shouldRemove) {
        let index = products.findIndex((product) => product.id === productToUpdate.id)
        if (shouldRemove) {
            products.splice(index, 1)
        } else {
            products.splice(index, 1, product)
        }
        setProducts(arr => [...arr])
    }

    function save() {
        if (Object.keys(product).every(i => {
            if (!product[i]) {
                if (i !== 'id' && i !== 'dataCadastro') {
                    setShowError("Por favor, preencha todos os campos")
                    return false
                }
            }
            return true
        })) {
            if (editMode) {
                updateBE(product)
            } else {
                addBE(product)
            }
        }
    }

    function addBE(product) {
        productService.addP(product)
            .then(response => {
                setProducts(list => [...list, new Product(response.data)])
                cleanForm()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Produto salvo com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: 'alert-top',
                    imageHeight: 30,
                    backdrop: false
                })
            })
            .catch(error => console.log(error))
    }

    function updateBE(product) {
        productService.updateP(product)
            .then(response => {
                updateOnTable(response.data)
                cleanForm()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Produto editado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: 'alert-top',
                    imageHeight: 30,
                    backdrop: false
                })
            })
            .catch(error => console.log(error))
    }

    function cleanForm() {
        setProduct({
            ...product,
            id: "",
            nome: "",
            valor: "",
            quantidadeEstoque: "",
            observacao: "",
            dataCadastro: "",
        })
    }

    const handleFilter = async () => {
        if (filterValue !== "") {
            setFilteredProducts(products.filter(value => {
                const searchStr = filterValue.toLowerCase().replace(/[().-]/g, '');
                const idMatches = value.id.toString().includes(searchStr)
                const nameMatches = value.nome.toLowerCase().includes(searchStr);
                const valueMatches = value.valor.toString().includes(searchStr);
                const stockMatches = value.quantidadeEstoque.toString().includes(searchStr);
                const obsMatches = value.observacao.toLowerCase().includes(searchStr);

                return idMatches || nameMatches || valueMatches || stockMatches || obsMatches;
            }))
            setProducts(arr => [...arr])
        }
    }

    return (
        <div style={{
            backgroundColor: sessionStorage.getItem("dark") === "true" ? "var(--background-color)" : "var(--background-color-light)",
            height: 'calc(100% - 45px)',
        }}
            data-bs-theme={sessionStorage.getItem("dark") === "true" ? "dark" : "light"}>
            <div className="container-root">
                <div className="row mt-3">
                    <div className="col-sm-12">
                        <h4 style={{ fontSize: '26px', color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Produtos</h4>
                        <hr style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }} />
                    </div>
                </div>

                <div className="filter-div">
                    <div className="row add-bt-div">
                        <button id="add-bt" className="btn btn-secondary btn-sm add-bt"
                            data-bs-toggle='modal' data-bs-target="#modal-product"
                            onClick={addP}>Cadastrar</button>
                    </div>
                    <div className="input-group rounded filter">
                        <span className="input-group-text filter-icon" id="search-addon"
                            style={{
                                color: sessionStorage.getItem("dark") === "true" ? "white" : "black",
                                backgroundColor: sessionStorage.getItem("dark") === "true" ? "#242424" : "#c7c7c7"
                            }}>
                            <i className="fas fa-search"></i>
                        </span>
                        <input id="filter" type="search" className="form-control" placeholder="Filtrar" aria-label="Search"
                            aria-describedby="search-addon"
                            style={{
                                color: sessionStorage.getItem("dark") === "true" ? "white" : "black",
                                backgroundColor: sessionStorage.getItem("dark") === "true" ? "#3d3d3d" : "#efefef"
                            }}
                            onChange={(e) => {
                                setFilterValue(e.target.value)
                            }}
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-sm-12 table-parent">
                        <table className="table table-bordered table-striped table-hover"
                            style={{ boxShadow: sessionStorage.getItem("dark") === "true" ? "0 0 3px 1px rgba(var(--darkmode-shadow), 0.8)" : "0 0 3px 1px rgba(var(--lightmode-shadow), 0.8)" }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Valor</th>
                                    <th>Estoque</th>
                                    <th>Observação</th>
                                    <th>Cadastro</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(filterValue !== "" ? filteredProducts : products).map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.nome}</td>
                                        <td>{"R$ " + product.valor}</td>
                                        <td>{product.quantidadeEstoque}</td>
                                        <td>{product.observacao}</td>
                                        <td>{new Date(product.dataCadastro).toLocaleDateString()}</td>
                                        <td>
                                            <button id={product.id} onClick={() => editP(product.id)} className="btn btn-outline-primary btn-sm edit-trash" data-bs-toggle='modal' data-bs-target="#modal-product">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                </svg>
                                            </button>
                                            <button id={product.id} onClick={() => deleteP(product.id)} className="btn btn-outline-primary btn-sm edit-trash">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row">
                    <div className="modal fade" id="modal-product">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>{editMode ? "Editar Cadastro" : "Criar Cadastro"}</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => setShowError("")}></button>
                                </div>
                                <div className="error"
                                    style={{
                                        backgroundColor: sessionStorage.getItem("dark") === "true" ? "#5e3131" : "#ff9494", color: sessionStorage.getItem("dark") === "true" ? "rgba(255,255,255,255.8)" : "rgba(0,0,0,0.8)",
                                        display: showError !== "" ? "flex" : "none",
                                        height: "30px"
                                    }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        className="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path
                                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                    <i id="error-msg">{showError}</i>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-sm-0" style={{ display: 'none' }}>
                                            <label htmlFor="id" className="form-label">ID:</label>
                                            <input disabled type="text" className="form-control" id="id"
                                                value={product.id}
                                            />
                                        </div>
                                        <div className="col-sm-5">
                                            <label htmlFor="name" className="form-label" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Nome:</label>
                                            <input type="text" className="form-control" id="name"
                                                value={product.nome}
                                                onChange={(e) => {
                                                    setProduct({ ...product, nome: e.target.value })
                                                    setShowError("")
                                                }}
                                                style={{
                                                    backgroundColor: sessionStorage.getItem("dark") === "true" ? "#3d3d3d" : "#efefef"
                                                }}
                                            />
                                        </div>
                                        <div className="col-sm-4">
                                            <label htmlFor="valor" className="form-label" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Valor:</label>
                                            <input type="number" className="form-control" id="valor"
                                                value={product.valor}
                                                onChange={(e) => {
                                                    setProduct({ ...product, valor: e.target.value })
                                                    setShowError("")
                                                }}
                                                style={{
                                                    backgroundColor: sessionStorage.getItem("dark") === "true" ? "#3d3d3d" : "#efefef"
                                                }}
                                            />
                                        </div>
                                        <div className="col-sm-3">
                                            <label htmlFor="stock" className="form-label" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Estoque:</label>
                                            <input type="number" maxLength="15" className="form-control" id="stock"
                                                value={product.quantidadeEstoque}
                                                onChange={(e) => {
                                                    setProduct({ ...product, quantidadeEstoque: e.target.value })
                                                    setShowError("")
                                                }}
                                                style={{
                                                    backgroundColor: sessionStorage.getItem("dark") === "true" ? "#3d3d3d" : "#efefef"
                                                }}
                                            />
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-sm-12">
                                                <label htmlFor="observacao" className="form-label" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Observação:</label>
                                                <textarea type="text" className="form-control" id="observacao"
                                                    value={product.observacao}
                                                    onChange={(e) => {
                                                        setProduct({ ...product, observacao: e.target.value })
                                                        setShowError("")
                                                    }}
                                                    style={{
                                                        backgroundColor: sessionStorage.getItem("dark") === "true" ? "#3d3d3d" : "#efefef",
                                                        width: '105.5%'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button id="save-bt" onClick={save} className="btn btn-secondary btn-sm" data-bs-dismiss={editMode ? (showError === "" ? "modal" : "") : ""}>Salvar</button>
                                    <button id="cancel-bt" onClick={() => setShowError("")} className="btn btn-light btn-sm" data-bs-dismiss="modal" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Cancelar</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}