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
    'X-MAGICBELL-API-SECRET': 'aa64c7e916793f3432a40fd41ff5451f57d3e844',
    'X-MAGICBELL-API-KEY': 'Af/ZLONiQehwgris0JjdE+z3t5R21DPZSlxTU3l0',
  };

const data = {
    notification: {
      title: 'Applied Job!!',
      content: 'Hello, can you upgrade us to the Startup plan. Thank you.',
      category: 'Jobs',
      action_url: 'https://magicbell.com/pricing',
      recipients: [{ email: 'microsoft@gmail.com' }],
    },
  }


const sendNotificacion = async() =>{
    const res = axios.post('https://api.magicbell.com/notifications', data, { headers:{
        'X-MAGICBELL-API-SECRET': 'aa64c7e916793f3432a40fd41ff5451f57d3e844',
        'X-MAGICBELL-API-KEY': 'Af/ZLONiQehwgris0JjdE+z3t5R21DPZSlxTU3l0',
    } });
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