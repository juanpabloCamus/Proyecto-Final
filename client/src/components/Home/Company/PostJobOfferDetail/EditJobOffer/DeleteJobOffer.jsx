import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { MdClose } from "react-icons/md";
import styles from "./EditJobOffer.module.css";
import Swal from "sweetalert2";
import { modalActions } from '../../../../../redux/modal_slice/modalSlice';





function DeleteJobOffer() {
	let dispatch = useDispatch
	const { id } = useParams();
	const handleSubmit = (e) => {
    e.preventDefault();
		eliminateOffer(id)
		dispatch(modalActions.setModalValue());
	}

	
	const eliminateOffer = async (id) => {
		try {
      const res = await axios.delete(`http://localhost:3001/jobs/${id}`)
			console.log(res)
			if (res.data) {
        Swal.fire({
          icon: "success",
          text: res.data,
          showConfirmButton: false,
          showCancelButton: false,
        })
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
	}





  return (
		<>
			<form  className={styles.form}>
					<h2>Are you sure?</h2>
					<div className={styles.form_button}>
            <button type="submit">Hide</button>
          </div>
					<div className={styles.form_button}>
            <button onClick={handleSubmit} type="submit">Erase</button>
          </div>
			</form>
		</>
  )
}

export default DeleteJobOffer