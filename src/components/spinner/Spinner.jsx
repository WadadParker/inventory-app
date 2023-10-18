import styles from "./spinner.module.css";

import React from 'react'

export const Spinner = () => {
  return (
    <div className={styles[`spinner-container`]}>
        <section className={styles.spinner}>
        </section>
    </div>
  )
}
