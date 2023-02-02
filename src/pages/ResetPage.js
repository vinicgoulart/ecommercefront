import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPage(){
    const navigate = useNavigate();
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        var email = event.target.emailInput.value;
        var password = event.target.passwordInput.value;

        var userData = {
            email: email,
            password: password
        }

        axios.post('http://localhost:9000/change-password', userData).then((res) => {
            navigate('/login');
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
                <form onSubmit={ handleSubmit }>
                    <p className="h3">Reset password</p>
                    <a className="text-secondary resetPass" onClick={ () => navigate('/') }>Get back to homepage</a>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">What's your email?</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="emailInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Type your new password!</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="passwordInput" />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset password</button>
                </form>
            </div>
        </>
    );
}

export default ResetPage;