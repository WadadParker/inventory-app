import styles from "./sales.module.css";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { SalesForm } from "../../components/salesForm/SalesForm";
import { Spinner } from "../../components/spinner/Spinner";
import { getAllItems,getAllSales,addNewSale } from "../../actions";

export const Sales = () => {

  const items = useSelector((state)=>state.items);
  const sales = useSelector((state)=>state.sales);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [dateFilter,setDateFilter]=useState({from:"",to:""});

  const formHandler=(item)=>
  {
    dispatch(addNewSale(item))
  }

  const convertToDate=(dateString)=>
  {
  const dateObject = new Date(dateString);
  
  const day = dateObject.getDate();
  const month = dateObject.toLocaleString('default', { month: 'short' });
  const year = dateObject.getFullYear();
  
  const formattedDate = `${day} ${month} ${year}`;
  
  return formattedDate;
  }

  const filteredSales = sales.filter((item)=>{
    if(dateFilter.from==="" || dateFilter.to==="")
    return true;
  else
    return item?.createdAt<dateFilter.to && item?.createdAt>dateFilter.from
  });

  useEffect(()=>
  {
    dispatch(getAllSales())
    dispatch(getAllItems());
  },[dispatch])

  return (
    <div className={styles[`main-container`]}>
      <h1>Sales</h1>
      <fieldset className={styles.filters}>
        <legend>Filters</legend>
        <label htmlFor="from">From:</label>
        <input value={dateFilter.from} id="from" type="Date" onChange={(e)=>setDateFilter(prev=>({...prev,from:e.target.value}))}/>
        <label htmlFor="to">To:</label>
        <input value={dateFilter.to} id="to" type="Date" onChange={(e)=>setDateFilter(prev=>({...prev,to:e.target.value}))}/>
      </fieldset>
      <section className={styles.section}>
      {loading?<Spinner />
        :<table className={styles.table}>
              <thead className={styles[`heading-row`]}>
                <tr>
                  <th>Date</th>
                  <th>Item</th>
                  <th>Revenue</th>
                </tr>
              </thead>

              <tbody>
                {filteredSales?.map((item) => (
                  <tr key={item?._id}>
                    <td className={styles[`table-data`]}>{convertToDate(item?.createdAt)}</td>
                    <td className={styles[`table-data`]}>{item?.item==="Deleted Item"?"Item Deleted":item?.item?.name}</td>
                    <td className={styles[`table-data`]}>{item?.price * item?.quantity}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td className={styles.revenue}>Total Revenue</td>
                  <td className={styles.total}>{filteredSales?.reduce((acc,{quantity,price})=> acc + (quantity * price),0)}</td>
                </tr>
              </tfoot>
            </table>}

        <SalesForm items={items} formHandler={formHandler}/>
      </section>
    </div>
  )
}
