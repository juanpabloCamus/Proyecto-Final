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
  let dispatch = useDispatch;
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    eliminateOffer(id);
    dispatch(modalActions.setModalValue());
  };
  const handleHide = (e) => {
    e.preventDefault();
    var w_now = window.self;
    w_now.close();
  };

  const eliminateOffer = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/jobs/${id}`);
      console.log(res);
      if (res.data) {
        Swal.fire({
          icon: "success",
          text: res.data,
          showConfirmButton: false,
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
      <form>
        <div className={styles.div}>
          <img className={styles.img} src={pregunta} alt="" />
          <h2 className={styles.h2}>Do you want to disable this offer?</h2>
          {/* <p>You won't be able to revert this</p> */}
          <div>
            <button onClick={handleSubmit} type="submit">
              Yes, disable it!
            </button>
          </div>
          <div>
            <button onClick={handleHide} type="submit">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DeleteJobOffer;
