import React from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../redux/modal_slice/modalSlice";
import styles from "./Premium.module.css";
import PremiumForm from "./PremiumForm";

export const Premium = () => {
  const { isOpen, premiumModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activatePremium(false));
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
              {premiumModal && <PremiumForm/>}
            </div>
          </div>
        </>
      )}
    </>,
    document.getElementById("premiumForm")
  );
};