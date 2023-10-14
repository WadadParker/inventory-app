import styles from "./sideBar.module.css";

import React from 'react'
import {Link} from "react-router-dom";


export const SideBar = () => {
  return (
    <nav className={styles.navbar}>
        <li className={styles.list}>
          <Link className={styles.link} to="/">Home</Link>
        </li>
        <li className={styles.list}>
           <Link className={styles.link} to="/items"> Items </Link>
        </li>
        <li className={styles.list}>
           <Link className={styles.link} to="/sales"> Sales </Link>
        </li>
        <li className={styles.list}>
           <Link className={styles.link} to="/report"> Report </Link>
        </li>
        <li className={styles.list}>
            <a className={styles.link} href="https://github.com/WadadParker/finance-management" target="_blank">Github</a>
        </li>
    </nav>
  )
}