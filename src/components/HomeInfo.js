import musicIcon from '../images/musicIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function HomeInfo({}){
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:9000/auth-info', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            setUserData(res.data.info);
        })
    }, []);

    const auth = Cookies.get('connect.sid');

    const loggedUser =
    <a className="text-primary">Welcome back, { userData.name }!</a>;

    const notLoggedUser =
    <a className="btn btn-primary" onClick={ () => navigate('/register') }>Start a new account now!</a>;

    return(
        <div className="container text-start mt-4">
            <div className="row">
                <div className="col-7">
                    <p className="text-start">Looking for a new Piano, Guitar or instrument? You came to the right place! Welcome to <a className="text-decoration-none">Pianow</a>, the official instrument E-commerce!</p>
                    { auth ? loggedUser : notLoggedUser }
                </div>
                <div className="col-5">
                    <img src={ musicIcon } className="img-fluid" width="300px" height="500px" />
                </div>
            </div>
        </div>
    );
}

export default HomeInfo;