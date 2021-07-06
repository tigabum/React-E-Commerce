import React from "react";
import Context from "./Context";

const withContext = WrappedComponent =>{
            const WHOC = props =>{
               return (
                   <Context.Consumer>
                       {context => <WrappedComponent {...props} context={context}/>}
                   </Context.Consumer>
               )
              
            }
    
    return WHOC;
}
export default withContext;