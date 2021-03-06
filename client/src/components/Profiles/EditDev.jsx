import React from "react";
import ReactDOM from "react-dom";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../redux/modal_slice/modalSlice";
import styles from "./EditDev.module.css";
import EditDevExpForm from "./EditDevExpForm/EditDevExpForm";
import EditDevEduForm from "./EditDevEduForm/EditDevEduForm";
import { fetchUser } from "../../redux/users/users";
import { MeetingModal } from "../Home/Company/ArrangeMeeting/MeetingModal";




export const EditDev = () => {
  const { isOpen, editDevExp, editDevEdu, arrangeMeeting } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const userLocalStorage = JSON.parse(localStorage.getItem("userData"));
  const { id } = userLocalStorage

  const handleCloseModal = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateEditDevExp(false));
    dispatch(modalActions.activateEditDevEdu(false));
    dispatch(fetchUser(id))
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
              {editDevExp && <EditDevExpForm />}
              {editDevEdu && <EditDevEduForm />}
              {arrangeMeeting && <MeetingModal/>}
            </div>
          </div>
        </>
      )}
    </>,
    document.getElementById("editDevExpForm")
  );
};