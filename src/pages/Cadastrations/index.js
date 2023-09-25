import '../../styles/cadastrations.css'
import cadastrationService from '../../services/cadastrationService'
import Cadastration from '../../models/cadastration'
import Swal from 'sweetalert2'

import { useEffect, useState, } from 'react'

export default function Cadastrations() {

    const [cadastrations, setCadastrations] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [cadastration, setCadastration] = useState(new Cadastration())
    const [filterValue, setFilterValue] = useState("")
    const [filteredCadastrations, setFilteredCadastrations] = useState([])
    const [showError, setShowError] = useState('')

    useEffect(() => {
        cadastrationService.getCadastrations()
            .then(response => {
                setCadastrations(response.data)
            })
            .catch(error => console.log(error))
    })

    useEffect(() => {
        handleFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterValue])

    function editC(id) {
        setEditMode(true)
        setCadastration(cadastrations.find(c => c.id === id))
    }

    function deleteC(id) {
        let cadastration = cadastrations.find(c => c.id === id)
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Deseja realmente deletar o cadastro do cliente ${cadastration.name}`)) {
            deleteBE(cadastration.id)
        }
    }

    function addC() {
        setEditMode(false)
        cleanForm()
    }

    function deleteBE(id) {
        cadastrationService.deleteC(id)
            .then(() => {
                updateOnTable(cadastrations.find(c => c.id === id), true)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cadastro deletado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: 'alert-top',
                    imageHeight: 30,
                    backdrop: false
                })
            })
            .catch(error => console.log(error))
    }

    function updateOnTable(cadastrationToUpdate, shouldRemove) {
        let index = cadastrations.findIndex((cadastration) => cadastration.id === cadastrationToUpdate.id)
        if (shouldRemove) {
            cadastrations.splice(index, 1)
        } else {
            cadastrations.splice(index, 1, cadastration)
        }
        setCadastrations(arr => [...arr])
    }

    function save() {
        if (Object.keys(cadastration).every(i => {
            if (!cadastration[i]) {
                if (i !== 'id' && i !== 'dataCadastro') {
                    setShowError("Por favor, preencha todos os campos")
                    return false
                }
            }
            return true
        })) {
            if (editMode) {
                updateBE(cadastration)
            } else {
                addBE(cadastration)
            }
        }
    }

    function addBE(cadastration) {
        cadastrationService.addC(cadastration)
            .then(response => {
                setCadastrations(list => [...list, new Cadastration(response.data)])
                cleanForm()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cadastro salvo com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: 'alert-top',
                    imageHeight: 30,
                    backdrop: false
                })
            })
            .catch(error => console.log(error))
    }

    function updateBE(cadastration) {
        cadastrationService.updateC(cadastration)
            .then(response => {
                updateOnTable(response.data)
                cleanForm()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cadastro editado com sucesso!',
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
        setCadastration({
            ...cadastration,
            id: "",
            name: "",
            shopping: "",
            email: "",
            number: "",
            dataCadastro: "",
        })
    }

    const handleFilter = async () => {
        if (filterValue !== "") {
            setFilteredCadastrations(cadastrations.filter(value => {
                const searchStr = filterValue.toLowerCase().replace(/[()-]/g, '');
                const idMatches = value.id.toString().includes(searchStr)
                const nameMatches = value.name.toLowerCase().includes(searchStr);
                const shoppingMatches = value.shopping.toString().includes(searchStr);
                const emailMatches = value.email.toLowerCase().includes(searchStr);
                const numberMatches = searchStr.length > 1 ? value.number.toString().includes(searchStr) : false
                console.log(searchStr)

                return idMatches || nameMatches || shoppingMatches || emailMatches || numberMatches;
            }))
            setCadastrations(arr => [...arr])
        }
    }

    function formatNumber(number) {
        const value = number || ""
        const rNumber = value.replace(/\D/g, "")
        if (rNumber.length === 0 || rNumber.length > 11) {
            return '';
        } else {
            let formattedNumber = '';
            if (number.length > 2) {
                formattedNumber = '(' + rNumber.slice(0, 2) + ') ';
            } else {
                formattedNumber = '(' + rNumber.slice(0, rNumber.length);
            }

            if (rNumber.length > 2 && rNumber.length > 7) {
                formattedNumber += rNumber.slice(2, 7) + '-' + rNumber.slice(7, 11);
            } else if (rNumber.length > 2) {
                formattedNumber += rNumber.slice(2, rNumber.length);
            }
            return formattedNumber;
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
                        <h4 style={{ fontSize: '26px', color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Cadastros</h4>
                        <hr style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }} />
                    </div>
                </div>

                <div className="filter-div">
                    <div className="row add-bt-div">
                        <button id="add-bt" className="btn btn-secondary btn-sm add-bt"
                            data-bs-toggle='modal' data-bs-target="#modal-cadastration"
                            onClick={addC}>Cadastrar</button>
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
                                    <th>Compras</th>
                                    <th>E-mail</th>
                                    <th>Telefone</th>
                                    <th>Cadastro</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(filterValue !== "" ? filteredCadastrations : cadastrations).map((cadastration, index) => (
                                    <tr key={index}>
                                        <td>{cadastration.id}</td>
                                        <td>{cadastration.name}</td>
                                        <td>{cadastration.shopping}</td>
                                        <td>{cadastration.email}</td>
                                        <td>{"(" + cadastration.number.substr(0, 2) + ") " + cadastration.number.substr(2, 5) + '-' + cadastration.number.substr(7)}</td>
                                        <td>{new Date(cadastration.dataCadastro).toLocaleDateString()}</td>
                                        <td>
                                            <button id={cadastration.id} onClick={() => editC(cadastration.id)} className="btn btn-outline-primary btn-sm edit-trash" data-bs-toggle='modal' data-bs-target="#modal-cadastration">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                </svg>
                                            </button>
                                            <button id={cadastration.id} onClick={() => deleteC(cadastration.id)} className="btn btn-outline-primary btn-sm edit-trash">
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
                    <div className="modal fade" id="modal-cadastration">
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
                                        <div className="col-sm-2" style={{ display: 'none' }}>
                                            <label htmlFor="id" className="form-label">ID:</label>
                                            <input disabled type="text" className="form-control" id="id"
                                                value={cadastration.id}
                                            />
                                        </div>
                                        <div className="col-sm-12">
                                            <label htmlFor="name" className="form-label" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Nome:</label>
                                            <input type="text" className="form-control" id="name"
                                                value={cadastration.name}
                                                onChange={(e) => {
                                                    setCadastration({ ...cadastration, name: e.target.value })
                                                    setShowError("")
                                                }}
                                                style={{
                                                    backgroundColor: sessionStorage.getItem("dark") === "true" ? "#3d3d3d" : "#efefef"
                                                }}
                                            />
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-sm-6">
                                                <label htmlFor="email" className="form-label" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>E-mail:</label>
                                                <input type="email" className="form-control" id="email"
                                                    value={cadastration.email}
                                                    onChange={(e) => {
                                                        setCadastration({ ...cadastration, email: e.target.value })
                                                        setShowError("")
                                                    }}
                                                    style={{
                                                        backgroundColor: sessionStorage.getItem("dark") === "true" ? "#3d3d3d" : "#efefef"
                                                    }}
                                                />
                                            </div>
                                            <div className="col-sm-4">
                                                <label htmlFor="number" className="form-label" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Telefone:</label>
                                                <input type="tel" maxLength="15" className="form-control" id="number"
                                                    value={formatNumber(cadastration.number)}
                                                    onChange={(e) => {
                                                        setCadastration({ ...cadastration, number: e.target.value.replace(/\D/g, '') })
                                                        setShowError("")
                                                    }}
                                                    style={{
                                                        backgroundColor: sessionStorage.getItem("dark") === "true" ? "#3d3d3d" : "#efefef"
                                                    }}
                                                />
                                            </div>
                                            <div className="col-sm-2">
                                                <label htmlFor="shopping" className="form-label" style={{ color: sessionStorage.getItem("dark") === "true" ? "white" : "black" }}>Compras:</label>
                                                <input type="number" className="form-control" id="shopping"
                                                    value={cadastration.shopping}
                                                    onChange={(e) => {
                                                        setCadastration({ ...cadastration, shopping: e.target.value })
                                                        setShowError("")
                                                    }}
                                                    style={{
                                                        backgroundColor: sessionStorage.getItem("dark") === "true" ? "#3d3d3d" : "#efefef"
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