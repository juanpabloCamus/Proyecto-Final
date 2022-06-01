import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchUser } from "../../redux/users/users";
import styles from './EditDevProfileForm.module.css'

function EditDevProfileForm() {

    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(fetchUser(id))
    }, [dispatch, id])

    const user = useSelector(state => state.users.user[0])
    
    const [currentInfo, setCurrentInfo] = useState(
        user === undefined ? null
        :
        {
            fullName: user.fullName,
            date_birth: user.date_birth,
            country: user.country,
            city: user.city,
            stack: user.stack,
        }
    )

    
    
    function handleChange(e){
        e.preventDefault();
        setCurrentInfo({
            ...currentInfo,
            [e.target.name]:e.target.value
        })
    };

    function handleSubmit(e){
        e.preventDefault();

    }

    
    if(user === undefined) return <h1>Loading...</h1>

    return (
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <input name='fullName' placeholder="name" value={currentInfo.fullName} onChange={handleChange}></input>
                <input placeholder="datbirth"></input>
                <input placeholder="country"></input>
                <input placeholder="city"></input>
                <input placeholder="orientation"></input>
                <input placeholder="currentjob"></input>
                <input placeholder="profilepic"></input>
                <input placeholder="bannerpic"></input>
                <button type = 'submit' onClick={handleSubmit}>Save changes</button>
            </form>
        </div>
    );
}

export default EditDevProfileForm;