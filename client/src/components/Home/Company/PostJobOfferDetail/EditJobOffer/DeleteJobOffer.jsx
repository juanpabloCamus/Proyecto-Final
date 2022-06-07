import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { MdClose } from "react-icons/md";
import styles from "./DeleteJobOffer.module.css";
import Swal from "sweetalert2";
import { modalActions } from "../../../../../redux/modal_slice/modalSlice";

import pregunta from "../../../../../assets/pregunta.jpg";

function DeleteJobOffer() {
  let dispatch = useDispatch();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    eliminateOffer(id);
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateDelete(false))
    dispatch(modalActions.setEstado())
  };

  const handleHide = () => {
    dispatch(modalActions.setModalValue());
    dispatch(modalActions.activateDelete(false))
  };

  const eliminateOffer = async (id) => {
    try {
      const res = await axios.delete(`/jobs/${id}`);
      if (res.data) {
        Swal.fire({
          icon: "success",
          text: res.data,
          showConfirmButton: true,
          showCancelButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: res.data,
          showConfirmButton: false,
          showCancelButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      
        <div className={styles.div}>
          <img className={styles.img} src={pregunta} alt="" />
          <h2 className={styles.h2}>Do you want to reactive this offer?</h2>
          {/* <p>You won't be able to revert this</p> */}
          <div>
            <button onClick={handleSubmit} type="submit">
              Yes, reactive it!
            </button>
          </div>
          <div>
            <button onClick={handleHide} type="submit">
              Cancel
            </button>
          </div>
        </div>
      
    </div>
  );
}

export default DeleteJobOffer;