import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Like from "../images/icons/thumbs-up-regular.svg";
import Navbar from "../components/Navbar";

function ItemPage({}){
    const navigate = useNavigate();
    const { state } = useLocation();

    const [itemData, setItemData] = useState({});
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage]= useState('');
    const [successAlert, setSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const { item } = state;
    useState(() => {
        axios.get('http://localhost:9000/item/' + item._id).then((res) => {
            setItemData(res.data.item);
            setSuccessAlert(true);
            setSuccessMessage('Item retrieved!');
        }).catch((error) => {
            setErrorAlert(true);
            setErrorMessage('An error ocurred when trying to get your item!');
        });
    }, []);

    function handleLikeItem(){
        axios.get('http://localhost:9000/item/like-item/' + item._id, {
            withCredentials: true
        }).then((res) => {  
            console.log(res.data);
        }).catch((error) => {
            setErrorAlert(true);
            setErrorMessage('You must be logged in to like an item!');
        });
    }

    function addItemtoCart(){
        axios.post('http://localhost:9000/cart/add-cart/' + item._id, {}, {
            withCredentials: true
        }).then((res) => {
            setSuccessAlert(true);
            setSuccessMessage('Successfully added the item to your cart!');
        }).catch((error) => {
            setErrorAlert(true);
            setErrorMessage('You must be logged in to add this item to your cart!');
        })
    }

    return(
        <>
            <Navbar />
            <div className="container mt-4">
                {
                    successAlert ? 
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success!</strong> { successMessage }
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setSuccessAlert(false) }></button>
                    </div>
                    : null
                }
                {
                    errorAlert ? 
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> { errorMessage }
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setErrorAlert(false) }></button>
                    </div>
                    : null
                }
                <div className="row">
                    <div className="col-7">
                        <img className="img-fluid mt-2" src={ item.imgLink }/>
                    </div>

                    <div className="col-5">
                        <div className="row">
                            <div className="col-8">
                                <p className="h1 text-start">{ item.name }</p>
                            </div>
                            <div className="col-4 align-self-center">
                                <p className="text-start mt-3">{ itemData.category }</p>
                            </div>
                        </div>
                        <p className="text-success">R$ { item.value }</p>
                        <p class="h5">Item description:</p>
                        <p>{ itemData.description }</p>
                        <p>Quantity: { itemData.quantity }</p>
                        <div className="row">
                            <div className="col-8">
                                <p className="h5 mt-2">Likes: { itemData.likes }</p>
                            </div>
                            <div className="col-4">
                                <a className="btn btn-primary" onClick={ handleLikeItem }>Like item <img src={ Like } width="20px" height="20px" /> </a>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-7">
                                <a className="btn btn-success" onClick={ addItemtoCart }>Buy now!</a>
                            </div>
                            <div className="col-5">
                                <a className="btn btn-info" onClick={ () => navigate('/') }>Get back to homepage</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}   

export default ItemPage;