import React, { useState } from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

//import { auth } from '../../firebase/firebase.utils';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

import './sign-in.styles.scss';

//class SignIn extends React.Component{
const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    // constructor(props){
    //     super(props)

    //     this.state = {
    //         email : '',
    //         password : ''
    //     }
    // }

    const [userCredentials, setCredentials] = useState({
        email : '',
        password : ''
    });

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {name , value} = event.target;

        setCredentials( { ...userCredentials, [name] : value});

    }

    return (
        <div className="sign-in">
            <h2 className="title">I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    name="email" 
                    label="Email" 
                    type="email" 
                    handleChange={handleChange} 
                    value={email} 
                    required
                />

                <FormInput 
                    name="password" 
                    label="Password" 
                    type="password" 
                    handleChange={handleChange} 
                    value={password} 
                    required
                />

                <div className="buttons">
                    <CustomButton type="submit"> Sign In </CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn> 
                        Sign in with Google 
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart : (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(
    null,
    mapDispatchToProps
)(SignIn);