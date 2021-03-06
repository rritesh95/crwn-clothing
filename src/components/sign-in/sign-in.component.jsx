import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

class SignIn extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            email : '',
            password : ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        
        this.setState ({ email: '', password: '' });
    }

    handleChange = event => {
        const {name , value} = event.target;

        this.setState( { [name] : value});

    }

    render(){
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

                    <CustomButton type="submit"> Sign In </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn;