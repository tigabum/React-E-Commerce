import React from 'react'

function ProductItem(props) {
    const{product} = props;
    return product.stock>0 ? (
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
                     <b style={{textTransform:'capitalize'}} >{product.name} {" "}
                     <span className="tag is-info" >${product.price} </span>
                     </b>
                     <div>{product.shortDesc} </div>
                     {
                         product.stock> 0? (
                             <small>{product.stock +  " Avalilable" } </small>
                         ):(
                             <small className="has-text-danger" >
                                 Out of Stock
                             </small>
                         )
                     }
                     <div className="is-clearfix">
                         <button 
                         className="button is-small is-outlined is-info is-pulled-right"
                         onClick={()=>props.addtocart({
                             id:product.name,
                             product:product,
                             amount:1,
                         })}
                         >
                         Add to cart
                         </button>
                     </div>

                    </div>
                </div>

               

            </div>
            

          
        </div>
    ):""
}

export default ProductItem
