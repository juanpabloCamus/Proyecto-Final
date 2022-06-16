import React from 'react'
import styles from "./Post.module.css"
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';


function Post({id,profile_pic,fullName,description,email,technologies,english_level,seniority,stack}) {

  return (
    <Link to={`/company/user/${id}`}>
    <div className={styles.postCard}>
      <div className={styles.imgContainer}>
      <Image
              cloudName="dlt2bs82a"
              publicId={profile_pic}
              width="100"
              id={styles.profilePic}
            />
      </div>
      <div className={styles.detailsContainer}>
        <p className={styles.fullName}><b>{fullName}</b></p>
        <p><b>{stack}</b></p>

      <p ><b>English Level:</b> {english_level}</p>
      <p ><b>Seniority:</b>  {seniority}</p>
      </div>
        <div  className={styles.techsContainer}>
          {technologies.map(t => t.name==='Cplus' ?
            (<label key={t.id} >C+</label>) :
            t.name==='Cplusplus' ?
            (<label key={t.id} >C++</label>) :
            t.name==='CSharp' ?
            (<label key={t.id} >C#</label>) :
            (<label key={t.id} >{t.name}</label>))}
        </div>
    </div>
   </Link>
  )
}

export default Post