import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

//import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import './sign-up.styles.scss';

import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.action';

// class SignUp extends React.Component{
const SignUp = ({ signUpStart }) => {
    // constructor(){
    //     super();

    //     this.state = {
    //         displayName : '',
    //         email : '',
    //         password : '',
    //         confirmPassword : ''
    //     };
    // }

    const [userCredentials, setCredentials] = useState({
        displayName : '',
        email : '',
        password : '',
        confirmPassword : ''
    });

    const { displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Passwords don't match");
            return;
        }

        //try{
            // const { user } = await auth.createUserWithEmailAndPassword(email, password);

            // await createUserProfileDocument(user, {displayName});
            signUpStart({ displayName, email, password });
            // this.setState({
            //     displayName : '',
            //     email : '',
            //     password : '',
            //     confirmPassword : ''
            // })

        // }catch(err){
        //     console.log(err);
        // }

    }

    const handleChange = event => {
        const { name, value } = event.target;

        setCredentials({ ...userCredentials, [name] : value});
    }

    return(
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type = "text"
                    name = "displayName"
                    label = "Display Name"
                    value = {displayName}
                    handleChange = {handleChange}
                    required
                />
                <FormInput
                    type = "text"
                    name = "email"
                    label = "Email"
                    value = {email}
                    handleChange = {handleChange}
                    required
                />
                <FormInput
                    type = "password"
                    name = "password"
                    label = "Password"
                    value = {password}
                    handleChange = {handleChange}
                    required
                />
                <FormInput
                    type = "password"
                    name = "confirmPassword"
                    label = "Confirm Password"
                    value = {confirmPassword}
                    handleChange = {handleChange}
                    required
                />
                <CustomButton
                    type = "submit"
                >SIGN UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart : signUpDetails => dispatch(signUpStart(signUpDetails))
})

export default connect(
    null,
    mapDispatchToProps
)(SignUp);