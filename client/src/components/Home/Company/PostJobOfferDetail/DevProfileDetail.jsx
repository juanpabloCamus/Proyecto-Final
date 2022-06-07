import { CloudinaryContext } from "cloudinary-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchJobDetail } from "../../../../redux/jobs/jobDetail";

function DevProfileDetail() {
  let {id_comp, id_dev} = useParams()
  let publicID = "nkiecep5puwwwylpdzvm";
  let dispatch = useDispatch()
  let jobDetail = useSelector((state) => state.jobDetail.jobDetail);
  console.log(jobDetail)
  useEffect(() => {
    dispatch(fetchJobDetail(id_comp));
  },[dispatch])
  //jobDetail.filter(e=>e.)
  return (
    <div>
      DevProfileDetail
      <div>
        <a
          href={`https://res.cloudinary.com/dhar2oawa/image/upload/fl_attachment:elbarto/${publicID}.pdf`}
          download
        >
          descargar pdf
        </a>
      </div>
    </div>
  );
}

export default DevProfileDetail;
