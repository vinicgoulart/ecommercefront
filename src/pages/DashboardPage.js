import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AddItemCard from "../components/AddItemCard";

function DashboardPage(){
    const navigate = useNavigate();

    const [usersChoose, setUsersChoose] = useState(true);
    const [itemsChoose, setItemsChoose] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    function handleUserChoice(){
        setUsersChoose(true);
        setItemsChoose(false);
        getUsers();
    }

    function handleItemChoice(){
        setUsersChoose(false);
        setItemsChoose(true);
        getItems();
    }

    useEffect(() => {

        var userSection = Cookies.get('connect.sid');

        if(!userSection) navigate('/');

        axios.get('http://localhost:9000/auth-info', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            var isUser = res.data.info.isAdmin;
            if(!isUser) navigate('/');
        }).catch((error) => {
            setErrorAlert(true);
        });

        getUsers();
        
    }, [itemList]);

    function getItems(){
        axios.get('http://localhost:9000/item/', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true 
        }).then((res) => {
            setItemList(res.data.list);
            setSuccessAlert(true);
        }).catch((error) => {
            setErrorAlert(true);
        });
    }

    function getUsers(){
        axios.get('http://localhost:9000/user', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            setUserList(res.data.list);
            setSuccessAlert(true);
        }).catch((error) => {
            setErrorAlert(true);
        });
    }

    function handleDeleteItem(id){
        axios.delete('http://localhost:9000/item/' + id, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            setSuccessAlert(true);
        }).catch((error) => {
            setErrorAlert(true);
        })
    }

    function handleTurnAdmin(id){
        axios.put('http://localhost:9000/user/update-status/' + id, {}, {
            withCredentials: true
        }).then((res) => {
            setSuccessAlert(true);
        }).catch((error) => {
            setErrorAlert(true);
        });
    }

    const listItems = itemList.map((items) => 
        <div class="card thingsCard mt-1">
            <div class="card-body">
                <h5 class="card-title">Title: { items.name }</h5>
                <p class="card-text">Category: { items.category }</p>
                <p class="card-text">R${ items.value }</p>
                <a href="#" class="btn btn-danger" onClick={ () => handleDeleteItem(items._id) }>Delete item</a>
            </div>
        </div>
    );

    const listUsers = userList.map((users) => 
    <div class="card thingsCard mt-4">
        <div class="card-body">
            <h5 class="card-title">Name: { users.name }</h5>
            <p class="card-text">UserName: { users.userName }</p>
            <p class="card-text">Email: { users.email }</p>
            <a href="#" class="btn btn-info" onClick={ () => handleTurnAdmin(users._id) }>Turn to an admin</a>
        </div>
    </div>
    );

    const error = <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error!</strong> An error ocorred during the operation.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={ () =>  setErrorAlert(false)}></button>
    </div>

    const success = <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success!</strong> The operation was successfully completed!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={ () =>  setSuccessAlert(false)}></button>
    </div>

    return(
        <>
            <Navbar />
            { errorAlert ?  error : null}
            { successAlert ? success : null }

            <div className="container loginBox listofThings">
                <button type="button" class="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create a new item
                </button>
                <AddItemCard />
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button className="button" class="btn btn-info" onClick={ handleUserChoice }>Users</button>
                    <button className="button" class="btn btn-success" onClick={ handleItemChoice }>Items</button> 
                </div>
                { usersChoose ?  listUsers : listItems}
            </div>
        </>
    );
}   

export default DashboardPage;