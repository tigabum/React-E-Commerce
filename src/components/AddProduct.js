import React, { Component } from 'react';
import withContext from '../withContext';
import {Redirect} from 'react-router-dom';
import axios from 'axios'

const initalState={
    name:"",
    price:"",
    stock:"",
    shortDesc:"",
    description:"",
}

class AddProduct extends Component {
  constructor(props){
      super(props);
      this.state=initalState
  }

  handleChange= e => this.setState({[e.target.name]:e.target.value})

  save = async (e)=>{
      e.preventDefault();
       const{name,price,stock,shortDesc,description} = this.state;
       if(name && price){
           const id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      await axios.post("http://localhost:3000/products", {id,name,price,stock,shortDesc,description})
      this.props.context.addproduct({
          id,
          name,
          price,
          stock,
          shortDesc,
          description
      },()=>this.setState(initalState) )
      this.setState({flash:{status:"is-success", msg:"Completed successfully"}})

       }else{
           this.setState({flash:{status:"is-danger", msg:"Please fill name and price or some fields which lefts empty"}})
       }


      




  }


    render() { 
        const{user} = this.props.context;
        const{name,price,stock,shortDesc,description} = this.state;
        
        return !(user && (user.accessLevel<1))? ( 
            <Redirect to="/" />
         ):(
             <>
             <div className="hero is-info is-centered ">
                 <div className="hero-body container ">
                     <h4 className="title">Add Product</h4>
                 </div>
             </div>
             <form onSubmit={this.save} >
                 <div className="columns is-mobile is-centered ">
                     <div className="column is-one-third ">
                         <div className="field">
                              <label  className="label">Product Name:</label>
                         <input 
                         type="text"
                          className="input" 
                            name="name"
                            value={name}
                            onChange={this.handleChange}

                          />

                         </div>
                            <div className="field">
                                <label className="label">price</label>
                          <input
                           name="price" 
                           type="number"
                           className="input" 
                           value={price}
                           onChange={this.handleChange}
                           />
                            </div>
                          <div className="field">
                               <label className="label">Stock</label>
                           <input
                            type="number"
                            className="input" 
                            name="stock"
                            value={stock}
                            onChange={this.handleChange}
                            />

                          </div>
                          <div className="field">
                              <label className="label">Short Description</label>
                            <input 
                            type="text"
                             className="input"
                             name="shortDesc"
                             value={shortDesc}
                             onChange={this.handleChange}
                             />

                          </div>
                          
                            <div className="field">
                                <label className="label">Description </label>
                             <input 
                             type="text" 
                             className="input"
                             value={description}
                             name="description"
                             onChange={this.handleChange}
                             />

                            </div>
                            {
                                this.state.flash && (
                                    <div className={`notification ${this.state.flash.status}`} >
                                            {this.state.flash.msg}
                                    </div>
                                )
                            }
                            <div className="field is-clear-fix">
                                <button
                                onClick={this.save}
                                 type="submit" 
                                 className="button is-info is-outlined is-pulled-right ">
                                    Save
                                </button>
                            </div>
                             


                     </div>
                 </div>
             </form>
             </>
         )
    }
}
 
export default withContext(AddProduct);
