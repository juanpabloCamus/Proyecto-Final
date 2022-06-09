import {React, useState} from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react'
import './ApplyModal.css'
import Swal from 'sweetalert2';


function Apply() {

const [ previewSource, setPreviewSource ] = useState("")
const [ postData, setPostData ] = useState({
    publicID: "",
    description: "",
    idUser: 0,
    idJob: 0,
    timeRange: "Any time"
});
const [loading, setLoading] = useState(false)

const { description, idUser, idJob, timeRange } = postData

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

const handleSelect = (e) => {
    e.preventDefault();
    setPostData({
        ...postData,
        timeRange: e.target.value
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
    if(!previewSource) return Swal.fire({icon:'error',text:`You must send your CV and a introduction message`})
    if(!postData.description) return Swal.fire({icon:'error',text:`You must send your CV and a introduction message`})
    await uploadFile(previewSource, postData);
}

const uploadFile = async (base64EncodeFile, data) => {
    setLoading(true)
    try {
        const res = await axios.post('/cloudinary', { data: base64EncodeFile}) 

                    await axios.post('/appliedJob', {
                        publicID: res.data,
                        description,
                        idUser,
                        idJob,
                        timeRange
                    }).then(res => {Swal.fire({icon:'success',title:'Congratulations!',text:`${res.data}`})})

    
    } catch (err) {
        Swal.fire({icon:'error',text:`${err.response.data}`})
    }
    setLoading(false)
}


  return (
    <div className="apply_form_container">
        <form onSubmit={handleSubmit} className="apply_form">
        <label>Schedule availability for possible meeting:</label>
        <select onChange={handleSelect}>
            <option value="Any time">Any time</option>
            <option value="8hs - 12hs">8hs - 12hs</option>
            <option value="12hs - 16hs">12hs - 16hs</option>
            <option value="16hs - 20hs">16hs - 20hs</option>
        </select>
            <p>Remember that the more flexible your schedule is, the more chances you have to get a meeting.</p>
         <label>Presentation message*</label>
              <textarea
                name="desc"
                columns="25"
                rows="5"
                value={postData.description}
                onChange={handleDescInputChange}
              ></textarea>
            <label>Upload your CV* (PDF only)</label>
            <input 
                type="file"
                accept="application/pdf"
                onChange={handleFileInputChange}
            ></input>
            <button type="submit" className="apply_button">
            {loading ? (
            <div id='loading'></div>
            ) : 
            'Send application'
            }
            </button>
        </form>
    </div>
  )
}

export default Apply