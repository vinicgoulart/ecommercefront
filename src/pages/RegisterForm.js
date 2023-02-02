import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function RegisterForm(){
    const navigate = useNavigate();
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(event){
        event.preventDefault();

        var userData = {
            email: event.target.emailInput.value,
            password: event.target.passwordInput.value,
            age: event.target.ageInput.value,
            name: event.target.nameInput.value,
            cpf: event.target.cpfInput.value,
            username: event.target.usernameInput.value,
            address: {
                street: event.target.streetInput.value,
                houseNumber: event.target.houseNumberInput.value,
                city: event.target.cityInput.value,
                cep: event.target.cepInput.value
            }
        };

        axios.post('http://localhost:9000/register', userData).then((res) => {
            navigate('/login');
        }).catch((error) => {
            setErrorAlert(true);
            setErrorMessage('Failed to register this account!');
        });
    }

    return(
        <>
            {
                errorAlert ? 
                <div class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
                    <strong>Register failed!</strong> { errorMessage }
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={ () => setErrorAlert(false) }></button>
                </div>
                : null
            }
            <div className="container loginBox">
                <form onSubmit={ handleSubmit }>
                    <p className="h3">Sign Up</p>
                    <a className="text-secondary resetPass" onClick={ () => navigate('/') }>Get back to homepage</a>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="nameInput" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="emailInput" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
                        <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="ageInput" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">CPF</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="cpfInput" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="usernameInput" />
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Street and City</span>
                        <input type="text" aria-label="First name" class="form-control" name="streetInput" />
                        <input type="text" aria-label="Last name" class="form-control" name="cityInput" />
                    </div>

                    <div className="input-group mt-3">
                        <span className="input-group-text">House Number and CEP</span>
                        <input type="number" aria-label="First name" className="form-control" name="houseNumberInput" />
                        <input type="text" aria-label="Last name" className="form-control" name="cepInput" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="passwordInput" />
                        <p>Forgot your password? <a className="text-info resetPass" onClick={ () => navigate('/resetpass') }>Click here!</a></p>
                        <p>Have an account? <a className="text-primary" onClick={ () => navigate('/login') }>Sign in here!</a></p>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        </>
    );
}

export default RegisterForm;