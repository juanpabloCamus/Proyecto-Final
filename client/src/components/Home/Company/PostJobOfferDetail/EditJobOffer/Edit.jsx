import React from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { modalActions } from "../../../../../redux/modal_slice/modalSlice";
import DeleteJobOffer from "./DeleteJobOffer";

import styles from "./edit.module.css";
import { EditJobOffer } from "./EditJobOffer";

export const Edit = () => {
  const { isOpen, editOffer, editDelete } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateEdit(false));
    dispatch(modalActions.activateDelete(false))
  };

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <>
          <div className={styles.overlay__modal}></div>
          <div className={styles.modal}>
            <div className={styles.close__icon}>
              <MdClose onClick={handleCloseModal} />
            </div>
            <div className={styles.form_container}>
              {editOffer && <EditJobOffer />}

              {editDelete && <DeleteJobOffer />}
            </div>
          </div>
        </>
      )}
    </>,
    document.getElementById("editPostJobOffer")
  );
};