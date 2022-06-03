import {React, useState} from 'react';
import { useForm } from '../../../../hooks/useForm.js';
import axios from 'axios'
import { MdUploadFile } from 'react-icons/md';
import { useParams } from 'react-router-dom'


function Aplay() {

const [formValues, handleInputChange] = useForm({
    desc: "",
})
const [ fileInputState, setFileInputState] = useState("")
const [ previewSource, setPreviewSource ] = useState("")
const [ postData, setPostData ] = useState({
    publicID: "",
    description: "",
    id_user: 0,
    id_job: 0,

});

const { id } = useParams()

const userLocalStorage=JSON.parse(localStorage.getItem("userData"))
console.log(userLocalStorage.id)


const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
}

const handleDescInputChange = (e) => {
    e.preventDefault();
    setPostData({
        ...postData,
        description: e.target.value,
        id_job: parseInt(id),
        id_user: userLocalStorage.id
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
    await uploadFile(previewSource);
    await post(postData)
}


const uploadFile = async (base64EncodeFile) => {
    try {
        const res = await axios.post('http://localhost:3001/cloudinary', { data: base64EncodeFile}) 

    await setPostData({
        ...postData,
        publicID: res.data
    })
    } catch (err) {
        console.log(err)
    }


}

const post = async (data) => {
    try{
    const res = await axios.post('http://localhost:3001/appliedJob', data)
    }catch(err){
        console.log(err)
    }
}


const { desc } = formValues
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
                name="image"
                value={fileInputState}
                onChange={handleFileInputChange}
            ></input>
            <button type="submit">Send Aplication</button>
        </form>
    </div>
  )
}

export default Aplay