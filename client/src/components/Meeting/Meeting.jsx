import React,{ useEffect } from 'react'
import { useParams } from 'react-router-dom' 
import { JitsiMeeting } from '@jitsi/react-sdk'
import styles from './Meeting.module.css'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeeting } from '../../redux/meeting/meeting';
import { fetchUser } from '../../redux/users/users';

function Meeting() {

    const navigate = useNavigate()
    const dispatch=useDispatch()
    const {id_meet}=useParams()
    const user = JSON.parse(localStorage.getItem("userData"))

    console.log(user)
    
    useEffect(()=>
    {
      dispatch(fetchMeeting(id_meet))
      dispatch(fetchUser())
    },[dispatch,id_meet])

    const meetback = useSelector(state=>state.meeting.meeting)

    /* let permiso = false
    let tiempo = Date()
    let horario = tiempo.slice(4,24)
    if(horario>"Jun 08 2022 11:10:00"){
        permiso = true
    }else{
        permiso = false
    } */

    return (
        meetback.idMeeting !== undefined && (user.fullName || user.name) ?
        <div className={styles.pageContainer}>
            <JitsiMeeting 
            getIFrameRef = { node => node.style.height = '800px' }
            roomName = { meetback.idMeeting }
            userInfo = {{displayName: user.profileType[0] === 'develop' ? user.fullName : user.name }}
            onReadyToClose = {() => {navigate('/')}}
            />
        </div>
        :
        <div>
            <h2>No existe la reunion</h2>
        </div>
    );
}

export default Meeting;