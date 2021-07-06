import React from 'react'
import withContext from '../withContext';
import CartItem from './CartItem';
function Cart(props) {
    const{cart} = props.context;
    const cartItem = Object.keys(cart || {});
    
    return (
        <>
        <div className="hero is-info">
            <div className="hero-body container ">
                <h2 className="title" >My Cart</h2>
                
            </div>
        </div>
        <br/>
        <div className="container">
            {
                    cartItem.length ? (
                        <div className="column columns is-multiline">
                            {
                                cartItem.map((key)=>(
                                    <CartItem
                                    key={key}
                                    cartkey={key}
                                    cartItem={cart[key]}
                                    removefromcart={props.context.removeFromCart}
                                    />
                                ))}
                                <div className="column is-12 is-clearfix">
                                    <div className="is-pulled-right">
                                        <button
                                        onClick={props.context.clear}
                                         className="button is-warning"
                                          >
                                              Clear
                                          </button>
                                          {" "}

                                        <button
                                        onClick={props.context.checkout}
                                         className="button is-success"
                                         >
                                        Checkout
                                             
                                             </button>
                                    </div>

                                </div>

                        </div>
                    ):(
                        <div className="column" >
                                <div className="title has-text-">No items found!</div>
                        </div>
                    )
        }
         </div>
      
        </>
    )
}

export default withContext(Cart);
