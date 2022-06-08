import React from 'react'
import { JitsiMeeting } from '@jitsi/react-sdk'
import styles from './Meeting.module.css'
import { useNavigate } from 'react-router';

function Meeting() {

    const navigate = useNavigate()

    return (
        <div className={styles.pageContainer}>
            <JitsiMeeting 
            getIFrameRef = { node => node.style.height = '800px' }
            roomName = { 'ROCKET_YOUR_CUSTOM_ROOM_NAME' }   
            userInfo = {{displayName: 'YOUR_USERNAME'}}
            onReadyToClose = {() => {navigate('/')}}          
            />
        </div>
    );
}

export default Meeting;