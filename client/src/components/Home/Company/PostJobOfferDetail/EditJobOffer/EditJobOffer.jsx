


export const EditJobOffer = () => {

	const {id} = useParams();
  const dispatch = useDispatch();
console.log(id);
 
  const [formValues, handleInputChange, reset] = useForm({
    position: '',
    description:'',
    time: '',
    salary_range: '',
    english_level:'',
    requirements: '',
    seniority: '',
    technologies: ''
  });

  const {
    position,
    description,
    time,
    salary_range,
    english_level,
    requirements,
    seniority,
    technologies,
  } = formValues;


  const handleCloseModal = () => {
    dispatch(modalActions.setModalValue());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editOffer();
    dispatch(modalActions.setModalValue())
  }

  const editOffer = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3001/jobs/${id}`, formValues);
      if(res.data.active === true){
        Swal.fire({
          icon: 'success',
          text: ""
        })
      }else{
        Swal.fire({
          icon: 'error',
          text: res.data
        })
      }
    } catch (error) {
			console.log(error);
		}
  };

  
  return (
    <div>
          <form onSubmit={handleSubmit}>
          <label>Position</label>
          <input
                type="text"
                name="position"
                value={position}
                onChange={handleInputChange}
              />
         
          <label>Time</label>
          <select onChange={handleInputChange}>
               <option>""</option>
                <option value="Not Specified">Not Specified</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Full-Time">Full-Time</option>
              </select>
          <label>Salary Range</label>
          <select  onChange={handleInputChange}>
                <option>""</option>
                <option value="Not Specified">Not Specified</option>
                <option value="0$ - 1000$">0$ - 1000$</option>
                <option value="1000$ - 3000$">1000$ - 3000$</option>
                <option value="3000$ - 6000$">3000$ - 6000$</option>
                <option value="6000$ - 10000$">6000$ - 10000$</option>
                <option value="10000$">+ 10000$</option>
              </select>
          <label>English Level</label>
          <select onChange={handleInputChange}>
                <option>""</option>
                <option value="Not required">Not required</option>
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Advanced or Native">Advanced or Native</option>
              </select>
              <label>Seniority</label>
          <select onChange={handleInputChange}>
                <option>""</option>
                <option value="Not Specified">Not Specified</option>
                <option value="Senior">Senior</option>
                <option value="Semi-Senior">Semi-Senior</option>
                <option value="Junior">Junior</option>
              </select>
          <label>Requirements</label>
          <textarea
                name="requirements"
                columns="10"
                rows="5"
                value={requirements}
                onChange={handleInputChange}
              ></textarea>
              <label>Description</label>
          <textarea
                name="requirements"
                columns="10"
                rows="5"
                value={description}
                onChange={handleInputChange}
              ></textarea>
         
          
          <div >
            <button type="submit">Send</button>
          </div>
          </form>


    </div>
  )
};
