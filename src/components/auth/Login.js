import React, { useContext, useState } from 'react';
import { Schema, FormGroup, Form, FormControl, ButtonGroup, Button, ControlLabel } from 'rsuite';
import { Auth } from '_firebaseconn/firebase.config';
import { AuthContext } from '_provider/AuthProvider';

const Login = ({history}) => {
    const { StringType } = Schema.Types;
    const currentUser = useContext(AuthContext)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginFormModel = Schema.Model({
        email: StringType()
            .isEmail('Please enter a valid email address.')
            .isRequired('This field is required.'),
        password: StringType()
            .isRequired('This field is required')
            .minLength(6, 'The field cannot be less than 6 characters')
    });

    const handleLoginSubmit = () => {
        Auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                history.push('/');
            })
            .catch(err => {
                console.log(err);
            })

    }

    if (currentUser) {
        history.push('/')
    }

    return (
        <div className="rov-login-container">
            <h2 className="rov-login-title">Rovees TM</h2>
            <Form fluid model={loginFormModel} className="rov-login-box">
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl 
                        name="email" 
                        type="email"
                        placeholder="Enter email"
                        onChange={setEmail}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl 
                        name="password" 
                        type="password"
                        placeholder="Enter password"
                        onChange={setPassword}
                    />
                </FormGroup>
                <ButtonGroup justified>
                    <Button type="submit" appearance="primary" onClick={handleLoginSubmit}>Sign In</Button>
                </ButtonGroup>
                <p className="signup-ins">Don't have account? Sign Up</p>
            </Form>
        </div>
    )
}

export default Login;