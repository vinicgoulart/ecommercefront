import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm(){
    const navigate = useNavigate();
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        var email = event.target.emailInput.value;
        var password = event.target.passwordInput.value;

        if(!email || !password){
            setErrorAlert(true);
            setErrorMessage('Both fields must be filled!');
        }

        var userData = {
            email: email,
            password: password
        };

        axios.post('http://localhost:9000/login', userData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {
            navigate('/');
        }).catch((error) => {
            setErrorAlert(true);
            setErrorMessage('Check your email and password.');
        });
    }

    return(
        <>
            {
                errorAlert ? 
                <div class="alert alert-danger alert-dismissible fade show mt-4" role="alert">
                    <strong>Login failed!</strong> { errorMessage }
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={ () => setErrorAlert(false) }></button>
                </div>
                : null
            }
            <div className="container loginBox">
                <form onSubmit={handleSubmit}>
                    <p className="h3">Sign In</p>
                    <a className="text-secondary resetPass" onClick={ () => navigate('/') }>Get back to homepage</a>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="emailInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="passwordInput" />
                        <p>Forgot your password? <a className="text-info resetPass" onClick={ () => navigate('/resetpass') }>Click here!</a></p>
                        <p>Don't have an account yet? <a className="text-primary resetPass" onClick={ () => navigate('/register') }>Click here and create a new one!</a></p>

                    </div>
                    <button type="submit" className="btn btn-primary">Sign In</button>
                </form>
            </div>
        </>
    );
}

export default LoginForm;