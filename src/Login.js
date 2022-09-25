import React from 'react';
import fire from './config/fire';
import Dashboard from './Dashboard.js';


class Login extends React.Component {
    login() {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        fire.auth().signInWithEmailAndPassword(email, password)
            .then((u) => {
                console.log("Succesfully logged in");
            })
            .catch((err) => {
                console.log("Error: " + err.toString());
            })
    }

    signUp() {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        fire.auth().createUserWithEmailAndPassword(email, password)
            .then((u) => {
                console.log("Succesfully logged in");
            })
            .catch((err) => {
                console.log("Error: " + err.toString());
            })
    }

    render() {
        return (
            <form>
                <h3>Sign In</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <div className="mb-3">
                    <div className="custom-control custom-checkbox d-inline-block">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1"> Remember me </label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary" onClick={this.login}>Submit</button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>

            // <div style={{ textAlign: 'center',  backgroundImage: `url("https://via.placeholder.com/500")` }}>
            //   <div>
            //     <h1>Groups N Griffins</h1>
            //     <div>Email</div>
            //     <input id="email" placeholder="Enter Email.." type="text"/>
            //   </div>
            //   <div>
            //     <div>Password</div>
            //     <input id="password" placeholder="Enter Password.." type="text"/>
            //   </div>
            //   <button style={{margin: '10px'}} onClick={this.login}>Login</button>
            //   <button style={{margin: '10px'}} onClick={this.signUp}>Sign Up</button>
            // </div>
        )
    }
}

export default Login;