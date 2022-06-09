import axios from 'axios'
import React from 'react'
import { useForm } from '../../../../hooks/useForm'
import { useParams } from 'react-router-dom' 
import { useSelector } from 'react-redux'

function ArrangeMeeting() {
    
    let { id_comp, id_dev } = useParams();

    let jobDetail = useSelector((state) => state.jobDetail.jobDetail);
  let filterUser = jobDetail[0]?.applied_jobs?.find(
    (e) => e.userAccountId == id_dev
  )
console.log(filterUser.timeRange)
    const [formValues, handleInputChange] = useForm({
        dateTime: "",
        messege: ""
    }) 

    const { dateTime, messege } = formValues

    const handleSubmit = async() => {
        const res = await axios.post('/arrangeMeeting', {
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
        <label>{`Set date and time of the meeting (user preferent: between ${filterUser.timeRange})`}:</label>
        <input 
            name="date" 
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