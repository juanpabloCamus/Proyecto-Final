import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from '../../../../hooks/useForm'
import { useParams } from 'react-router-dom' 
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux'
import { modalActions } from '../../../../redux/modal_slice/modalSlice'
function ArrangeMeeting() {
    
    let { id_comp, id_dev } = useParams();
    const dispatch=useDispatch()
    
    const [dateTime,setDateTime]=useState("")
    const [messege, setMessege]=useState("")



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
                id_dev
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
        <label>Set date and time of the meeting:</label>
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