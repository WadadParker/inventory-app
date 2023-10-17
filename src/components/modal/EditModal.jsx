import styles from "./editModal.module.css";

import React, { useState } from 'react'


export const EditModal = ({item,setShowModal,editHandler}) => {
    const [input,setInput]=useState(item);

    const changeHandler=(inputField,text)=>
    {
      setInput(prev=>({...prev,[inputField]:text}))
    }

    const clickHandler=()=>
    {
        editHandler(item?._id,{name:input.name,quantity:Number(input.quantity),price:Number(input.price),category:input.category});
        setShowModal({modal:false,item:{}});
    }

    const isDisable=()=> input.quantity<1 || input.name==="" || input.category==="" || input.price < 1

  return (
    <div className={styles[`background-container`]}>
        <main className={styles[`modal-container`]}>
            <h3>Edit Item Form</h3>
            <input placeholder="Name" value={input.name} onChange={(e)=>changeHandler("name",e.target.value)}/>
            <input type="Number" placeholder="quantity" value={input.quantity} onChange={(e)=>changeHandler("quantity",e.target.value)}/>
            <input type="Number" placeholder="price" value={input.price} onChange={(e)=>changeHandler("price",e.target.value)}/>
            <input placeholder="Category" value={input.category} onChange={(e)=>changeHandler("category",e.target.value)}/>
            
            <section className={styles[`button-container`]}>
            <button className={styles.close} onClick={()=>setShowModal({modal:false,item:{}})}>Close</button>
            <button className={styles.update} disabled={isDisable()} onClick={()=>clickHandler()}>Update Item</button>
            </section>
        </main>
    </div>
  )
}
