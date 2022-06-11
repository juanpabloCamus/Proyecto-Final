import React,{ useEffect } from 'react'
import { useParams } from 'react-router-dom' 
import { JitsiMeeting } from '@jitsi/react-sdk'
import styles from './Meeting.module.css'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeeting } from '../../redux/meeting/meeting';

function Meeting() {

    const navigate = useNavigate()
    const dispatch=useDispatch()
    const {id_meet}=useParams()
    const user = JSON.parse(localStorage.getItem("userData"))
    
    useEffect(()=>
    {
      dispatch(fetchMeeting(id_meet))
    },[dispatch,id_meet])

    const meetback = useSelector(state=>state.meeting.meeting)
    
    console.log(typeof meetback.userAccountId)
    console.log(typeof meetback.companyAccountId)
    console.log(typeof user.id)

    return (
        meetback ?
        meetback.idMeeting ?
        (user.profileType === 'develop' && meetback.userAccountId === user.id) || (user.profileType === 'company' && meetback.companyAccountId === user.id) ?
        <div className={styles.pageContainer}>
            <JitsiMeeting 
            getIFrameRef = { node => node.style.height = '800px' }
            roomName = { meetback.idMeeting }
            userInfo = {{displayName: user.profileType[0] === 'develop' ? user.fullName : user.name }}
            onReadyToClose = {() => user.profileType[0] === 'develop' ? navigate('/home') : navigate('/company')}
            />
        </div>
        :
        <div>
            <h2>No perteneces a esta reunion</h2>
        </div>
        :
        <div>
            <h2>No existe la reunion</h2>
        </div>
        :
        <div>
            <h2>No existe la reunion</h2>
        </div>
    );
}

export default Meeting;
