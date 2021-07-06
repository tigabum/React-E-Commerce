import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import jwt_decode from "jwt-decode";
import axios from 'axios';
import Context from './Context';
import Products from './components/Products';
import Login from './components/Login';
import Cart from './components/Cart';
import AddProduct from './components/AddProduct';
import About from './components/dropdown/About'
import Contact from './components/dropdown/Contact'
import Jobs from './components/dropdown/Jobs'
import Report from './components/dropdown/Report'

class App extends Component {
  constructor(props){
    super(props);
 this.state = { 
    user:null,
    cart:{},
    products:[],
   }
    this.routerRef = React.createRef();

  }

  async componentDidMount(){
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart")
    const products = await axios.get(" http://localhost:3000/products");
       user = user? JSON.parse(user) : null;
       cart = cart ? JSON.parse(cart) : {};
      this.setState({user:user, products:products.data,cart:cart })

    // console.log(products);
  }


   logout = e =>{
     e.preventDefault();
     this.setState({user:null})
     localStorage.removeItem("user");
     console.log("logout");
   }
   addToCart= addItem =>{
      let cart = this.state.cart;
     if(cart[addItem.id]){
       cart[addItem.id].amount += addItem.amount;
     }else{
       cart[addItem.id]= addItem;
     }
     if(cart[addItem.id].amount> cart[addItem.id].product.stock){
       cart[addItem.id].amount= cart[addItem.id].product.stock;
     }
      localStorage.setItem("cart", JSON.stringify(cart));
      this.setState({cart});

   }
   removeFromCart = (cartkey)=>{
          // console.log("remove from cart")
          let cart = this.state.cart;
          delete cart[cartkey];
          localStorage.setItem("cart", JSON.stringify(cart));
          this.setState({cart})
   }
   clear=()=>{
    //  console.log("clear")
    let cart = {};
    localStorage.removeItem("cart")
    this.setState({cart});

   }
   checkout=()=>{
    //  console.log("checkkout")
    if(!this.state.user){
      this.routerRef.current.history.push("/login");
      return;
      

    }
    let cart = this.state.cart;

      const products = this.state.products.map((p)=>{
        if(cart[p.name]){
          p.stock = p.stock - cart[p.name].amount;
          axios.put(` http://localhost:3000/products/${p.id}`,{...p})
        }
        return p;
      })
      this.setState({products});
      this.clearCart();

   }
   clearCart = ()=>{
     let cart = {};
     localStorage.removeItem("cart");
     this.setState({cart})
   }
   addProduct = (objectparameter, callbackparameter)=>{
     let products = this.state.products.slice() ;
     products.push(objectparameter);
     this.setState({products}, ()=> callbackparameter&&callbackparameter())
   }
   login = async (email, password)=>{
    //  console.log(email+password);
     const res = await axios.post("http://localhost:3000/users",
     {email,password},
     ).catch((error)=>{
       console.log(error);
       return {status:408, message:"unauthorized"}
     })
     console.log(res);
     console.log(res.data.email)
     if(res.status === 201){
      //  console.log(res);
      //  console.log(jwt_decode(res.data.email) );
      //  const {email} = jwt_decode(res.data.accessToken);
       const user = {
         email:res.data.email,
         accessLevel: email=== "owner@gmail.com"? 0:1,
       }
       this.setState({user})
       localStorage.setItem("user", JSON.stringify(user) );
       return true;
     }else{
       console.log(false)
       return false;
     }
      
   }

  render() { 
    return (
      <Context.Provider
      value={{
        ...this.state,
        addToCart:this.addToCart,
        removeFromCart:this.removeFromCart,
        clear:this.clear,
        checkout:this.checkout,
        login:this.login,
        addproduct:this.addProduct

       

      }}
      
      >
         <Router ref={this.routerRef}>
        
       <div className="App"  >
         <nav
         className="navbar "
         role="navigation"
         aria-label="main navigation"
         >
            
            <div className="navbar-brand">
     <b className="navbar-item is-size-3" >E-Commerce</b>
         <label  role="button"
         class="navbar-burger burger"
         aria-label="menu"
         aria-expanded="false"
         data-target="navbarBasicExample"
         onClick={
           e=>{
             e.preventDefault();
             this.setState({
               showMenu:!this.state.showMenu
             })
           }
         }
         >
           <span aria-hidden="true" ></span>
           <span aria-hidden="true" ></span>
           <span aria-hidden="true" ></span>


         </label>
           
          </div>
          <div className={`navbar-menu ${
                  this.state.showMenu ? "is-active" : ""
                }`} >
            <Link to="/products" className="navbar-item" >
              Products
            </Link>
            {
              this.state.user && this.state.user.accessLevel<1 && (
                <Link to="/add-products" className="navbar-item">
              Add Product
            </Link>)
            }
            <Link to="/cart" className="navbar-item">
              Cart
              <span
              className="tag is-info"
                style={{marginLeft:"5px"}}
              >
                {Object.keys(this.state.cart).length }
              </span>
            </Link>
            
            <div className="navbar-end">
              <div className="navbar-item">
                <div className=" navbar-item  has-dropdown is-hoverable">
                      <Link  className="navbar-link" >
                        More
                      </Link>
                      <div className="navbar-dropdown">
                        <Link to="about" className="navbar-item" >
                          About
                        </Link>
                        <Link to="/jobs" className="navbar-item" >
                          Jobs
                        </Link>
                        <Link to="/contact" className="navbar-item" >
                        Contact
                        </Link>
                        <hr className="navbar-divider" />
                        <Link to="/report" className="navbar-item" >
                        Report an Issue
                        </Link>
                      </div>

                    </div>
                <div className="buttons">
                  {
                    !this.state.user ? (
                    <Link className="button is-light" to="/login" >
                    Login
                    </Link>
                    ):(
                      <Link to="/" onClick={this.logout} className="button is-primary"   >
                          Logout
                      </Link>
                    )
                  }
                </div>
              </div>
            </div>

            

          </div>


         </nav>

   <Switch>
                    <Route exact path="/" component={Products}/>
                    <Route exact path="/products" component={Products}/>  
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/add-products" component={AddProduct} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/jobs" component={Jobs} />
                    
                    <Route exact path="/report" component={Report} />
     
     
     </Switch>      

       </div>

      </Router>

      </Context.Provider>

     
      );
  }
}
 
export default App;
