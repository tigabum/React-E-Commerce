import React, { Component } from 'react';
import withContext from '../withContext';
import {Redirect} from 'react-router-dom';
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",

        }
    }
    
    handleChange = e=>
        this.setState({
                [e.target.type]: e.target.value,
                error:""})

    
    submit = (e)=>{
        e.preventDefault();
        // console.log("submitted")
        const{email, password} = this.state;
        if(!email || !password){
            return this.setState({error:"Please fill all spaces"})
        }
        this.props.context.login(email, password)
        .then((loggedin)=>{
            if(!loggedin){
                this.setState({error:"Invalid Credentails"});
            }
        })

    }
    render() { 
        return !this.props.context.user ? ( 
            <>
            <div className="hero is-info ">
                <div className="hero-body container">
                    <div className="title">Login</div>
                </div>
            </div>
            <br/>
            <br/>
            <form onSubmit={this.submit} >
                <div className="columns is-mobile is-centered">
                 <div className="column is-one-third">
                   <div className="field">
                       <lable className="label">Email:</lable>
                       <input
                        type="email"
                        className="input"
                        onChange={this.handleChange}
                        
                        />
                   </div>
                   <div className="field">
                       <lable className="label">Password</lable>
                       <input type="password" 
                       className="input"
                       onChange={this.handleChange}
                       />
                   </div>
                   {
                       this.state.error && (
                           <div className="has-text-danger">{this.state.error} </div>
                       )
                   }
                   <div className="field is-clearfix">
                       <button className="button is-info is-outlined is-pulled-right" > 
                           Submit
                       </button>
                   </div>
                 </div>
                </div>

            </form>
            </>

         ): (
             <Redirect to="/products" />
         )
    }

}

export default withContext(Login);