import React,{ useEffect, useState } from 'react'
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
    const user=useSelector(state=>state.users.users)
    console.log(user)
    useEffect(()=>
    {
      dispatch(fetchMeeting(id_meet))
      dispatch(fetchUser())
    },[])
    const meetback=useSelector(state=>state.meeting.meeting)
  /* let permiso = false
    let tiempo = Date()
    let horario = tiempo.slice(4,24)
    if(horario>"Jun 08 2022 11:10:00"){
        permiso = true
    }else{
        permiso = false
    } */
  


    return (
        /* permiso? */
        <div className={styles.pageContainer}>
            <JitsiMeeting 
            getIFrameRef = { node => node.style.height = '800px' }
            roomName = {meetback.idMeeting  }
            userInfo = {{displayName: "your name"}}
            onReadyToClose = {() => {navigate('/')}}
            />
        </div>
        /* :
        <div>
            <h2>No es horario de la reunion</h2>
        </div> */
    );
}

export default Meeting;