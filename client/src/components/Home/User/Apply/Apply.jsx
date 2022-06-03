import {React, useState} from 'react';
import { useForm } from '../../../../hooks/useForm.js';
import axios from 'axios'
import { MdUploadFile } from 'react-icons/md';
import { useParams } from 'react-router-dom'


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
        const res = await axios.post('http://localhost:3001/cloudinary', { data: base64EncodeFile}) 

                    await axios.post('http://localhost:3001/appliedJob', {
                        publicID: res.data,
                        description,
                        idUser,
                        idJob
                    })
    } catch (err) {
        console.log(err)
    }
}

  return (
    <div>
        <form onSubmit={handleSubmit}>
         <label>Description</label>
              <textarea
                name="desc"
                columns="25"
                rows="3"
                value={postData.description}
                onChange={handleDescInputChange}
              ></textarea>
            <label>Upload your CV</label>
            <input 
                type="file"
                onChange={handleFileInputChange}
            ></input>
            <button type="submit">Send Aplication</button>
        </form>
    </div>
  )
}

export default Apply