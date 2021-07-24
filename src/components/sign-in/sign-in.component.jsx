import React from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

//import { auth } from '../../firebase/firebase.utils';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

import './sign-in.styles.scss';

class SignIn extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            email : '',
            password : ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        const { emailSignInStart } = this.props;

        emailSignInStart(email, password);
    }

    handleChange = event => {
        const {name , value} = event.target;

        this.setState( { [name] : value});

    }

    render(){
        const { googleSignInStart } = this.props;
        return (
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        label="Email" 
                        type="email" 
                        handleChange={this.handleChange} 
                        value={this.state.email} 
                        required
                    />

                    <FormInput 
                        name="password" 
                        label="Password" 
                        type="password" 
                        handleChange={this.handleChange} 
                        value={this.state.password} 
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
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart : () => dispatch(googleSignInStart()),
    emailSignInStart : (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(
    null,
    mapDispatchToProps
)(SignIn);