import styles from "./report.module.css";

import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";

import { getAllItems,getAllSales } from "../../actions";

export const Report = () => {

  const items = useSelector((state)=>state.items);
  const sales = useSelector((state)=>state.sales);
  const dispatch = useDispatch();

  const [reportType,setReportType]=useState("items");
  const [showReport,setShowReport] = useState(false);

  const changeHandler=(option)=>
  {
    setReportType(option)
    setShowReport(false);
  }

  useEffect(()=>
  {
    dispatch(getAllItems());
    dispatch(getAllSales());

  },[dispatch])

  return (
    <div>
      <h1>Reports</h1>
      <header className={styles[`report-header-container`]}>
        <label htmlFor="reports">Report Type</label>
        <select id="reports" value={reportType} onChange={(e)=>changeHandler(e.target.value)}>
          <option value="items">Inventory Reports</option>
          <option value="sales">Sales Reports</option>
        </select>
        <button className={styles[`report-button`]} onClick={()=>setShowReport(true)}>Generate Report</button>
      </header>

      {showReport && reportType==="items" && <table className={styles.table}>
        <thead className={styles[`heading-row`]}>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {items?.map(item=>
            (
              <tr key={item?._id}>
                <td className={styles[`table-data`]}> {item?.name} </td>
                <td className={styles[`table-data`]}> {item?.quantity} </td>
                <td className={styles[`table-data`]}> {item?.category} </td>
              </tr>
            ))}
        </tbody>
      </table>}

      {showReport && reportType==="sales" &&<table className={styles.table}>
        <thead className={styles[`heading-row`]}>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map(item=>
            (
              <tr key={item?._id}>
                <td className={styles[`table-data`]}> {item?.item==="Deleted Item"?"Item Deleted":item?.item?.name} </td>
                <td className={styles[`table-data`]}> {item?.quantity} </td>
                <td className={styles[`table-data`]}> {item?.quantity * item?.price} </td>
              </tr>
            ))}
        </tbody>
      </table>}

    </div>
  )
}
