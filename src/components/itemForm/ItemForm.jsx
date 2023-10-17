import styles from "./itemForm.module.css";

import React, { useState } from 'react'

export const ItemForm = ({type,formHandler}) => {
  
  const [input,setInput]=useState({name:"",quantity:"",price:"",category:""});

  const changeHandler=(inputField,text)=>
  {
    setInput(prev=>({...prev,[inputField]:text}))
  }

  const clickHandler=()=>
  {
    // formHandler({name:input.name,quantity:Number(input.quantity),price:Number(input.price),category:input.category});
    setInput({name:"",quantity:"",price:"",category:""});
  }

  const isDisable=()=> input.quantity<1 || input.name==="" || input.category===""

  return (
    <div className={styles.form}>
        <h2 className={styles[`form-header`]}>Add {type}</h2>
        <input placeholder="Name" value={input.name} onChange={(e)=>changeHandler("name",e.target.value)}/>
        <input type="Number" placeholder="quantity" value={input.quantity} onChange={(e)=>changeHandler("quantity",e.target.value)}/>
        <input type="Number" placeholder="price" value={input.price} onChange={(e)=>changeHandler("price",e.target.value)}/>
        <input placeholder="Category" value={input.category} onChange={(e)=>changeHandler("category",e.target.value)}/>
        
        <button className={styles.button} disabled={isDisable()} onClick={()=>clickHandler()}>Add New {type}</button>
    </div>
  )
}
