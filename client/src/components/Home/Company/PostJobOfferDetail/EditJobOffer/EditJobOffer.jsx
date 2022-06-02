import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { useForm } from "../../../../../hooks/useForm";
import { modalActions } from "../../../../../redux/modal_slice/modalSlice";
import Swal from 'sweetalert2'
import "./edit.css";

export const EditJobOffer = () => {
	const {id} = useParams();
  const [formValues, handleInputChange, reset] = useForm({
    position: "",
    description: "",
    time: "",
    salary_range: "",
    english_level: "",
    requirements: "",
    seniority: "",
    technologies: "",
  });

  const {
    position,
    description,
    time,
    salary_range,
    english_level,
    requirements,
    seniority,
    technologies,
  } = formValues;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const handleCloseModal = () => {
    dispatch(modalActions.setModalValue());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editOffer();
    dispatch(modalActions.setModalValue())
  }
  const editOffer = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3001/jobs/${id}`, formValues);
      if(res.data.active === true){
        Swal.fire({
          icon: 'success',
          text: ""
        })
      }else{
        Swal.fire({
          icon: 'error',
          text: res.data
        })
      }
    } catch (error) {
			console.log(error);
		}
  };

  
  return (
    <div>
          <form onSubmit={handleSubmit}>
          <label>Position</label>
          <label></label>
          <label></label>
          <label></label>
          <label></label>
          <label></label>
          <label></label>
          <label></label>
          </form>


    </div>
  )
};
