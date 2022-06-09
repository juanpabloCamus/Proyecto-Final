import React from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk'
import styles from './Meeting.module.css'
import { useNavigate } from 'react-router';

function Meeting() {

    const navigate = useNavigate()

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
            roomName = { 'ROCKET_YOUR_CUSTOM_ROOM_NAME' }
            userInfo = {{displayName: 'YOUR_USERNAME'}}
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