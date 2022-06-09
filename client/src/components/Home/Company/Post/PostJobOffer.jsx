import React from "react";
import styles from "./Post.module.css";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { BiHide } from "react-icons/bi";

export default function PostJobOffer({
  id,
  position,
  salary_range,
  seniority,
  time,
  technologies,
  applications,
  active,
}) {
  return (
    <div key={id}>
      {
        <Link to={`/company/offers/${id}`}>
          <div className={styles.postCard}>
           
            <div className={styles.detailsContainer}>
              <h3>{position}</h3>
              <p>Salary Range:</p>
              <div className={styles.subDetails}>
                <p>{salary_range === "10000$" ? "+ 10000$" : salary_range}</p>
                <p>Seniority: {seniority}</p>
                <p>Time: {time}</p>
              </div>
            </div>
            <div className={styles.techsContainer}>
              {technologies.map((t) =>
                t.name === "Cplus" ? (
                  <label key={t.id}>C+</label>
                ) : t.name === "Cplusplus" ? (
                  <label key={t.id}>C++</label>
                ) : t.name === "CSharp" ? (
                  <label key={t.id}>C#</label>
                ) : (
                  <label key={t.id}>{t.name}</label>
                )
              )}
            </div>
            <div>
              
              {active ? (
                <div className={styles.button}>
                  <FaEye />
                </div>
              ) : (
                <div className={styles.button1}>
                  <BiHide/>
                </div>
              )}
            <div className={styles.applications}>
              <h3>Applications</h3>
              <h4>{applications.length}</h4>
            </div>
            </div>

          </div>
        </Link>
      }
    </div>
  );
}
