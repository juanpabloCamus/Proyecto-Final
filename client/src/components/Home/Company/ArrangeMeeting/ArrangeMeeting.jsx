import axios from 'axios'
import React from 'react'
import { useForm } from '../../../../hooks/useForm'
import { useParams } from 'react-router-dom' 

function ArrangeMeeting() {
    
    let { id_comp, id_dev } = useParams();

    const [formValues, handleInputChange] = useForm({
        dateTime: "",
        messege: ""
    }) 

    const { dateTime, messege } = formValues

    const handleSubmit = async() => {
        console.log(dateTime,messege,id_comp,id_dev)
        await axios.post('/meeting/arrangeMeeting', {
            dateTime,
            messege,
            id_comp,
            id_dev
        })
    }

    

  return (
      <>
      <h1>Arrange Meeting</h1>
    <form onSubmit={handleSubmit}>
        <label>Set date and time of the meeting:</label>
        <input 
            name="dateTime" 
            type='datetime-local'
            onChange={handleInputChange}
        ></input>
        <label>Brief message:</label>
        <textarea 
        name="messege"
        onChange={handleInputChange}
        ></textarea>
        <button type='submit'>Send</button>
    </form>
    </>
  )
}

export default ArrangeMeeting