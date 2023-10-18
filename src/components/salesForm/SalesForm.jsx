import styles from "./salesForm.module.css";

import React, { useState } from 'react'

export const SalesForm = ({items,formHandler}) => {
    const [input,setInput]=useState({item:"",quantity:"",price:""});

    const changeHandler=(inputField,text)=>
    {
      setInput(prev=>({...prev,[inputField]:text}))
    }

    const clickHandler=()=>
    {
        formHandler({item:input.item,quantity:Number(input.quantity),price:Number(input.price)});
        setInput({item:"",quantity:"",price:"",category:""});
    }

    const isDisable=()=> input.quantity<1 || input.item==="" || input.price < 1

  return (
    <div className={styles.form}>
        <h2 className={styles[`form-header`]}>Add new Transaction</h2>
        <select className={styles.select} value={input.item} onChange={(e)=>changeHandler("item",e.target.value)}>
            <option value="">Select Item</option>
            {items?.map(item=>
                (
                    <option key={item?._id} value={item?._id}>{item?.name}</option>
                ))}
        </select>
        <input type="Number" placeholder="quantity" value={input.quantity} onChange={(e)=>changeHandler("quantity",e.target.value)}/>
        <input type="Number" placeholder="price" value={input.price} onChange={(e)=>changeHandler("price",e.target.value)}/>
        
        <button className={styles.button} disabled={isDisable()} onClick={()=>clickHandler()}>New Sales</button>
    </div>
  )
}
