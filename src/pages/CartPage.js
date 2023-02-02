import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Navbar from "../components/Navbar";

function CartPage(){
    const navigate = useNavigate();

    const [cart, setCart] = useState({});
    const [item, setItem] = useState({});
    const [successAlert, setSuccessAlert] = useState(false);
    const [sucessMessage, setSuccessMessage] = useState('');
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        var userSection = Cookies.get('connect.sid');

        if(!userSection) navigate('/');

        axios.get('http://localhost:9000/cart/', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            console.log(res.data.cart);
            setCart(res.data.cart);
            setItem(res.data.cart.item);
            setSuccessAlert(true);
            setSuccessMessage('Cart retrieved!');
        }).catch((error) => {
            setErrorAlert(true);
            setErrorMessage('Could not retrieve your carts!');
        });
    }, []);

    function handleDelete(){
        axios.delete('http://localhost:9000/cart/delete-cart/' + cart._id, {
            withCredentials: true
        }).then((res) => {
            setSuccessAlert(true);
            setSuccessMessage('Cart deleted!');
            navigate('/');
        }).catch((error) => {
            setErrorAlert(true);
            setErrorMessage('Could not delete this card!');
        })
    }

    return(
        <>
            <Navbar />
            <div className="container loginBox listofThings">
                { errorAlert ? 
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> { errorMessage }
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setErrorAlert(false) }></button>
                    </div>
                : null }
                { successAlert ?
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> { sucessMessage }
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSuccessMessage(false) }></button>
                    </div>
                    : null }
                {
                    cart ? <div className="card cardStyle">
                    <div className="card-body">
                        <h5 className="card-title">{ item.name }</h5>
                        <p className="card-text">Shipping Date: <Moment format="YYYY/MM/DD">{ cart.shippingDate }</Moment></p>
                        <p className="text-succes">R${ item.value }</p>
                        <a href="#" className="btn btn-primary">Pay product</a>
                        <a href="#" className="btn btn-danger btnDelete" onClick={ handleDelete }>Delete cart</a>
                    </div>
                </div>
                : <div>
                    <h1>No carts were found!</h1>
                    <a className="text-secondary resetPass" onClick={ () => navigate('/') }>Get back to homepage</a>   
                </div>
                }
                
            </div>
        </>
    );
}

export default CartPage;