import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { modalActions } from "../../redux/modal_slice/modalSlice";
import { authActions } from "../../redux/auth/authSlice";

import "./login.css";

export const Login = () => {
  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userError, setUserError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post("/login", formValues);

      if (res.data.active === true) {
        setErrorMessage("");
        setUserError(false);
        dispatch(modalActions.setModalValue());
        const userData = res.data;
        userData.profileType = userData.profileType.split(" ");

        localStorage.setItem("userData", JSON.stringify(userData));
        dispatch(authActions.getNewUser(userData));

        if (userData.profileType.includes("develop")) {
          navigate("/home");
        } else if (userData.profileType.includes("company")) {
          navigate("company");
        } else if (userData.profileType.includes("admin")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setErrorMessage(res.data);
        setUserError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const switchForm = () => {
    dispatch(modalActions.activateRegisterModal(true));
    dispatch(modalActions.activateLoginModal(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };



  return (
    <div>
      <form onSubmit={handleSubmit} className="login_form">
        {userError === true ? (
          <label className="errorMessage">{errorMessage}</label>
        ) : null}
        <label>Email*</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleInputChange}
          required
        />
        <label>Password*</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="login__button">
          Send
        </button>
        <div className="switch_form">
          <p onClick={switchForm}>Not have an account yet?</p>
        </div>
        <div className="switch_form">
        </div>
      </form>
    </div>
  );
};
