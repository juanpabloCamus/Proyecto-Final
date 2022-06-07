import React from 'react'
import styles from "./Post.module.css"
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';


function Post({id,profile_pic,fullName,description,email,technologies}) {
  return (
    <Link to={`/company/post/${id}`}>
    <div className={styles.postCard}>
      <div className={styles.imgContainer}>
      {/* <img src={profile_pic} alt="profile user"/> */}
      <Image
              cloudName="dhar2oawa"
              publicId={profile_pic}
              //id={styles.banner}
              //width="100"
              //crop="scale"
            />
      </div>
      <div className={styles.detailsContainer}>
        <p>{fullName}</p>
      {description===null? <p className={styles.null}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>:
      
      <p>{description}</p>} 
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
    </div>
   </Link>
  )
}

export default Post