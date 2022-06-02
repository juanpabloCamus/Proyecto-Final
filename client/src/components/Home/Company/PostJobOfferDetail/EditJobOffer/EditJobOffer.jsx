import axios from "axios";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { useForm } from "../../../../../hooks/useForm";
import { modalActions } from "../../../../../redux/modal_slice/modalSlice";

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

  const editOffer = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3001/jobs/${id}`, formValues);
    } catch (error) {
			console.log(error);
		}
  };

  return <></>;
};
