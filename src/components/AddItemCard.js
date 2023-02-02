import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddItemCard({}){
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    function handleSubmit(event){
        event.preventDefault();

        var userData = {
            name: event.target.nameInput.value,
            value: event.target.valueInput.value,
            description: event.target.descriptionInput.value,
            quantity: event.target.quantityInput.value,
            category: event.target.categoryInput.value,
            imgLink: event.target.imgLinkInput.value
        };

        axios.post('http://localhost:9000/item/', userData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            setSuccess(true);
        }).catch((error) => {
            setError(true);
        });
    }

    return(
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Create new Item</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                { error ? <div class="alert alert-danger" role="alert">
                    Check your inputs!
                </div>
                : null
                }
                {
                    success ? <div class="alert alert-success" role="alert">
                    Created!
                </div>
                : null
                }
                <div className="modal-body">
                    <form onSubmit={ handleSubmit }>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="nameInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Value (R$)</label>
                        <input type="number" className="form-control" id="exampleInputPassword1" name="valueInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name="descriptionInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Quantity</label>
                        <input type="number" className="form-control" id="exampleInputPassword1" name="quantityInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Category</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name="categoryInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Image link</label>
                        <input type="url" className="form-control" id="exampleInputPassword1" name="imgLinkInput" />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Create item</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    );
}

export default AddItemCard;