import { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Navbar({}){
    const [errorAlert, setErrorAlert] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const auth = Cookies.get('connect.sid');

    function handleLogout(){
        axios.get('http://localhost:9000/logout', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            navigate('/login');
            Cookies.remove('connect.sid');
        }).catch((error) => {
            setErrorAlert(true);
        });
    }

    function handleIsAdmin(){
        axios.get('http://localhost:9000/auth-info', {
            withCredentials: true
        }).then((res) => {
            setIsAdmin(res.data.info.isAdmin);
        }).catch(() => {

        });
    }

    useEffect(() => {
        handleIsAdmin();
    }, []);

    const loggedUser = <ul className="nav me-auto mb-lg-0">
        { isAdmin ? <li className="nav-item">
            <a className="nav-link text-warn resetPass" onClick={ () => navigate('/dashboard') }>Dashboard</a>
        </li> : null }
        <li className="nav-item">
            <a className="nav-link text-info resetPass" onClick={ () => navigate('/cart') }>Cart</a>
        </li>
        <li className="nav-item">
            <a className="nav-link text-danger resetPass" onClick={ handleLogout }>Logout</a>
        </li>
    </ul>

    const notLoggedUser = <ul className="nav me-auto mb-lg-0">
        <li className="nav-item">
            <a className="btn btn-primary" onClick={ () => navigate('/login') }>Login</a>
        </li>
        <li className="nav-item">
            <a className="nav-link resetPass" onClick={ () => navigate('/register') }>Register</a>
        </li>
    </ul>


    return(
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <img src={ logo } className="img-fluid logoImage" width="100px" height="76px" alt="logo" onClick={ () => navigate('/') } />
                    <div className="d-flex">
                        { auth ? loggedUser : notLoggedUser }
                    </div>
                </div>
            </nav>
            {
                errorAlert ? 
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Error!</strong> Could not log out of your account!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={ () => setErrorAlert(false) }></button>
                </div>
                : null
            }
        </>
    );
}

export default Navbar;