import React from 'react'

function CartItem(props) {
    const{cartItem, cartkey} = props;
    const{product, amount}= cartItem;
    const totalprice = amount>0? product.price*amount:"";
    
    return (
        <div className="column is-half" >
          <div className="box">
              <div className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                         <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={product.shortDesc}
              />
                    </figure>

                  </div>
                  <div className="media-content">
                      <b style={{textTransform:"capitalize"}} >{product.name}{" "}
                      <span className="tag is-info" >${product.price} </span>
                       </b>
                       <div>{product.shortDesc} </div>
                        {/* <small> { ` ${amount} item in Cart`} </small> */}
                        <small> <span style={{color:'green', fontSize:'15px', fontWeight:"bold" }}>{amount} </span> item in Cart </small>
                        <br/>    
                        {/* <small>{amount&& `Total cost is: $${totalprice}`} </small>  */}
                        <small>Total Price is: <span className="tag is-info" >${totalprice} </span> </small>
                  </div>
                  <div 
                  className="media-right"
                  onClick={()=>props.removefromcart(cartkey)}
                  >
                            <span className="delete is-large">
                                
                            </span>
                        </div>
              </div>
          </div>
        </div>
    )
}

export default CartItem
