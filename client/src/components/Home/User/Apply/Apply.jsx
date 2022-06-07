import {React, useState} from 'react';
import { useForm } from '../../../../hooks/useForm.js';
import axios from 'axios'
import { MdUploadFile } from 'react-icons/md';
import { useParams } from 'react-router-dom'

import './ApplyModal.css'


function Apply() {

const [ previewSource, setPreviewSource ] = useState("")
const [ postData, setPostData ] = useState({
    description: "",
    idUser: 0,
    idJob: 0,
});

const { description, idUser, idJob } = postData

const { id } = useParams()

const userLocalStorage=JSON.parse(localStorage.getItem("userData"))

const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
}

const handleDescInputChange = (e) => {
    e.preventDefault();
    setPostData({
        ...postData,
        description: e.target.value,
        idJob: parseInt(id),
        idUser: userLocalStorage.id
    })
    
}

const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onloadend = () => {
        setPreviewSource(reader.result)
    }
}

const handleSubmit = async (e) => {
    e.preventDefault();
    if(!previewSource) return;
    if(!postData.description) return;
    await uploadFile(previewSource, postData);
}


const uploadFile = async (base64EncodeFile, data) => {
    try {
        const res = await axios.post('/cloudinary', { data: base64EncodeFile}) 

                    await axios.post('/appliedJob', {
                        publicID: res.data,
                        description,
                        idUser,
                        idJob
                    })
    } catch (err) {
        console.log(err)
    }
}


const headers = {
    'X-MAGICBELL-API-KEY': 'c96eae5e30c793d17315ce13033abc734f4ef490',
    'X-MAGICBELL-API-SECRET': 'FKOZoWjSNvnlNGLflrjM/jcFt6AJaAeRHBObQpeg',
  };
    
  const data = {
    notification: {
      title: "We're processing your order",
    },
  };


const sendNotificacion = async() =>{
    const res = axios.post('https://api.magicbell.com/notifications', data, headers).catch((error) => {
        console.log(error)
      });
    console.log(res.data)
    console.log("Enviado")
}

  return (
    <div className="apply_form_container">
        <form onSubmit={handleSubmit} className="apply_form">
         <label>Description</label>
              <textarea
                name="desc"
                columns="25"
                rows="5"
                value={postData.description}
                onChange={handleDescInputChange}
              ></textarea>
            <label>Upload your CV</label>
            <input 
                type="file"
                onChange={handleFileInputChange}
            ></input>
            <button type="submit" className="apply_button" onClick={() => sendNotificacion()}>Send Aplication</button>
        </form>
    </div>
  )
}

export default Apply