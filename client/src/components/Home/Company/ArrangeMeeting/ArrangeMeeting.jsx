import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux'
import { modalActions } from '../../../../redux/modal_slice/modalSlice'

import styles from './arrangeModal.module.css'

function ArrangeMeeting() {
    
    const devLocalStorage = JSON.parse(localStorage.getItem("userData"))
    let id_comp = devLocalStorage.id

    let { id_job, id_dev, id } = useParams();

    const dispatch=useDispatch()
    
    const [dateTime,setDateTime]=useState("")
    const [messege, setMessege]=useState("")
    let idDev = id


    let jobDetails = useSelector((state) => state.jobDetail.jobDetail);

    if(id_job){
      let filterJob = jobDetails?.find(
        (e) => e.id === parseInt(id_job)
      )
      var filterAplication = filterJob?.applied_jobs?.find(
        (e) => e.userAccountId === parseInt(id_dev)
      )
    }

    const handledateTime=(e)=>{
        setDateTime(e.target.value)
    }
    const handleMessege=(e)=>{

        setMessege(e.target.value)
    }
    const send = async () => {
     
        try {
          if(id_job){
            const res= await axios.post('meeting/arrangeMeeting', {
                dateTime,
                messege,
                id_comp,
                id_dev,
                id_job
            })

            if (res.data === 'Meeting created') {
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

          }else{
            const res= await axios.post('meeting/compMeeting', {
              dateTime,
              messege,
              id_comp,
              idDev
          })

          if (res.data === 'Meeting created') {
            Swal.fire({
              icon: "success",
              text: res.data,
              showConfirmButton: false,
              showCancelButton: false,
              timer:1000
            });
          } else {
            Swal.fire({
              icon: "error",
              text: res.data,
              showConfirmButton: false,
              showCancelButton: false,
              timer:1000

            });
          }
          }
        } catch (error) {
          console.log(error);
        }
      };
     
    const handleSubmit = () => {

      dispatch(modalActions.activateArrangeMeeting(false))
      dispatch(modalActions.setModalValue())
      send()
    }

  return ( 
      <>
        <h2 className={styles.arrange_modal_title}>Arrange Meeting</h2>
        <form onSubmit={handleSubmit} className={styles.arrange_form}>
          {id_job ? 
            <label>{`Set date and time of the meeting (user preferent: between ${filterAplication.timeRange})`}:</label>
            :
            <label>Set date and time of the meeting:</label>
          }
            <input 
                name="dateTime" 
                type='datetime-local'
                onChange={handledateTime}
            ></input>
            <label>Brief message:</label>
            <textarea
            rows="5" 
            name="messege"
            onChange={handleMessege}
            ></textarea>
            <button type='submit' className={styles.arrange_modal_button}>Send</button>
        </form>
    </>
  )
}

export default ArrangeMeeting