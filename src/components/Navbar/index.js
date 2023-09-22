import '../../styles/navbar.css'
import {Link, useLocation} from 'react-router-dom'
import userService from '../../services/userService';

export default function Navbar(){
    const logout = () => {
        userService.logout()
    }
    if(useLocation().pathname !== '/login'){
        return(
            <ul className='navbar'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/cadastros'>Cadastros</Link></li>
                <li><Link to='/produtos'>Produtos</Link></li>
                <li><Link onClick={logout}>Sair</Link></li>
            </ul>
        )
    }else{
        return null
    }
}