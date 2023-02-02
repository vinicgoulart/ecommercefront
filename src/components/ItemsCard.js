import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ItemsCard(){
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9000/item/', {
            withCredentials: false,
        }).then((res) => {
            setItems(res.data.list);
        }).catch((error) => {
            console.log(error);
        })
    }, []);


    const listItems = items.map((item) => 
        <div className="card itemsCard ml-4" key={ item._id }>
            <img src={ item.imgLink } className="card-img pt-2 imageStyle"/>
            <div className="card-body">
                <h5 className="card-title">{ item.name }</h5>
                <p className="card-text">R$ { item.value }</p>
                <a className="btn btn-primary" onClick={ () => navigate('/item', { replace: true, state: { item } }) }>See more</a>
            </div>
        </div>
    );

    return(
        <div className="text-center container-fluid row d-flex">
            { listItems }
        </div>
    );
}

export default ItemsCard;