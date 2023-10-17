import styles from "./items.module.css";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { ItemForm } from "../../components/itemForm/ItemForm";
import { EditModal } from "../../components/modal/EditModal";
import { Spinner } from "../../components/spinner/Spinner";
import { getAllItems, addNewItem, updateItem, deleteItem } from "../../actions";

export const Items = () => {
  const items = useSelector((state) => state.items);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  let allCategories = [];

  const [showModal, setShowModal] = useState({ modal: false, item: {} });
  const [category, setCategory] = useState("");

  const formHandler = (newItem) => {
    dispatch(addNewItem(newItem));
  };

  const editHandler = (itemId, updatedItem) => {
    dispatch(updateItem(itemId, updatedItem));
  };

  const deleteHandler = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  const filteredItems = [...items].filter((item) =>
    item.category.includes(category)
  );

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  return (
    <>
      {showModal.modal && (
        <EditModal
          item={showModal.item}
          setShowModal={setShowModal}
          editHandler={editHandler}
        />
      )}
      <div className={styles[`main-container`]}>
        <h1>Items</h1>
        <fieldset>
          <legend>Filters</legend>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={""}>All Categories</option>
            {items?.map(({ category }, index) => {
              if (!allCategories.includes(category)) {
                allCategories.push(category);
                return (
                  <option value={category} key={index}>
                    {category}
                  </option>
                );
              }
            })}
          </select>
        </fieldset>
        <section className={styles.section}>
          {loading ? (
            <Spinner />
          ) : (
            <table className={styles.table}>
              <thead className={styles[`heading-row`]}>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th className={styles[`icon-container`]}></th>
                </tr>
              </thead>

              <tbody>
                {filteredItems?.map((item) => (
                  <tr key={item?._id}>
                    <td className={styles[`table-data`]}>{item?.name}</td>
                    <td className={styles[`table-data`]}>{item?.quantity}</td>
                    <td className={styles[`table-data`]}>{item?.price}</td>
                    <td className={styles[`table-data`]}>{item?.category}</td>
                    <td
                      className={`${styles[`icon-container`]} ${
                        styles[`table-data`]
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className={styles.edit}
                        onClick={() => setShowModal({ modal: true, item })}
                      />

                      <FontAwesomeIcon
                        icon={faTrash}
                        className={styles.delete}
                        onClick={() => deleteHandler(item?._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <ItemForm type="Item" formHandler={formHandler} />
        </section>
      </div>
    </>
  );
};
