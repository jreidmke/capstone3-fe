import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useTitle from '../hooks/useTitle';
import Alert from "../common/Alert";

function LoginForm({ login }) {
    useTitle("Login Form");
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    async function submit(e) {
        e.preventDefault();
        let result = await login(formData);
        if(result.success) {
            history.push("/home");
        } else {
            setFormErrors(result.error);
        };
    };

    function handleChange(e) {
        const { name, value }= e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Login Form</h1>
                </div>
            </div>
            
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="col-6">
                            <label>Email</label>
                            <input
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                id="emailInput"
                                placeholder="Email"
                                type="text"
                                required
                            />
                        </div>
                        <div className="col-6">
                            <label>Password</label>
                            <input
                                name="password"
                                className="form-control"
                                value={formData.password}
                                type="password"
                                onChange={handleChange}
                                placeholder="Password"
                                id="passwordInput"
                                required
                            />
                        </div>         
                    </div>

                    <div className="row mt-3">
                            <div className="col">
                                {formErrors.length ?
                                <Alert type="danger" messages={formErrors}/>
                                : ""}
                            </div>    
                    </div> 

                    <div className="row mt-4">
                            <div className="col">
                                <button className="btn btn-info btn-lg btn-block">Login</button>
                            </div>
                    </div>
                </form>
        </div>
    )
};

export default LoginForm;