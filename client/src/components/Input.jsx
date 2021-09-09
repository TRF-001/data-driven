import React from "react";



function Input(props){

    
    
    return (
    <label class= "custom-field"> 
        <input type= "text"  onChange = {props.onChange} onClick = {props.onClick} value = {props.value} ></input>
        <span class="placeholder" style = {props.pHolderStyle}>{props.holder}</span>
    </label>   
    )

}


export default Input