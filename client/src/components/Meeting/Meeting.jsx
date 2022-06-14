import React,{ useEffect } from 'react'
import { useParams } from 'react-router-dom' 
import { JitsiMeeting } from '@jitsi/react-sdk'
import styles from './Meeting.module.css'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { fetchMeeting } from '../../redux/meeting/meeting';
import Loading from '../Loading/Loading'

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

    return (
        meetback[0] ?
        meetback[0].idMeeting ?
        (user.profileType[0] === 'develop' && meetback[0].userAccountId === user.id) || (user.profileType[0] === 'company' && meetback[0].companyAccountId === user.id) ?
        <div className={styles.pageContainer}>
            <JitsiMeeting 
            getIFrameRef = { node => node.style.height = '800px' }
            roomName = { meetback[0].idMeeting }
            userInfo = {{displayName: user.profileType[0] === 'develop' ? user.fullName : user.name }}
            onReadyToClose = {() => user.profileType[0] === 'develop' ? navigate('/home') : navigate('/company')}
            />
        </div>
        :
        <div>
            <h2>You don't belong to this meeting</h2>
        </div>
        :
        <div>
            <h2>The meeting doesn't exist</h2>
        </div>
        :
        <div>
            <Loading></Loading>
        </div>
    );
}

export default Meeting;
