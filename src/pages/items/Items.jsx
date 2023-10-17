import styles from "./items.module.css";

import React from 'react'

import { ItemForm } from "../../components/itemForm/ItemForm";

export const Items = () => {
  return (
    <div className={styles[`main-container`]}>
      <h1>Items</h1>
      <section>
      <ItemForm type="Item" />
      </section>
    </div>
  )
}
