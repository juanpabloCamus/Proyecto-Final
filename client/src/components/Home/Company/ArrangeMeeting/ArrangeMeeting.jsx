import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux'
import { modalActions } from '../../../../redux/modal_slice/modalSlice'
function ArrangeMeeting() {
    
    const { id } = JSON.parse(localStorage.getItem("userData"))
    let id_comp = id

    let { id_job, id_dev } = useParams();
    const dispatch=useDispatch()
    
    const [dateTime,setDateTime]=useState("")
    const [messege, setMessege]=useState("")

    let jobDetail = useSelector((state) => state.jobDetail.jobDetail);
    let filterUser = jobDetail[0]?.applied_jobs?.find(
      (e) => e.userAccountId === id_dev
    )

    const handledateTime=(e)=>{
        setDateTime(e.target.value)
    }
    const handleMessege=(e)=>{

        setMessege(e.target.value)
    }
    const send = async () => {
        try {
            const res= await axios.post('meeting/arrangeMeeting', {
                dateTime,
                messege,
                id_comp,
                id_dev,
                id_job
            })
    
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
     
    const handleSubmit = () => {

      send()
      dispatch(modalActions.activateArrangeMeeting(false))
    }


  return (
      <>
      <h1>Arrange Meeting</h1>
    <form onSubmit={handleSubmit}>
        <label>{`Set date and time of the meeting (user preferent: between ${filterUser.timeRange}`}:</label>
        <input 
            name="dateTime" 
            type='datetime-local'
            onChange={handledateTime}
        ></input>
        <label>Brief message:</label>
        <textarea 
        name="messege"
        onChange={handleMessege}
        ></textarea>
        <button type='submit'>Send</button>
    </form>
    </>
  )
}

export default ArrangeMeeting