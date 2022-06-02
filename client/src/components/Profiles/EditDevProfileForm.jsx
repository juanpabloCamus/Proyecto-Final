import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchUser } from "../../redux/users/users";
import styles from './EditDevProfileForm.module.css'
import Swal from 'sweetalert2'
import { MdClose } from "react-icons/md";
import { fetchTechs } from "../../redux/techs/techs";


let techId = 0;

function EditDevProfileForm() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        dispatch(fetchUser(id))
        dispatch(fetchTechs());
        addCurrentTechs()
    }, [dispatch, id])
    
    const user = useSelector(state => state.users.user[0])
    const techs = useSelector((state) => state.techs.techs);
    
    const [currentInfo, setCurrentInfo] = useState(
        user === undefined ? dispatch(fetchUser(id))
        :
        {
            fullName: user.fullName,
            date_birth: user.date_birth,
            country: user.country,
            city: user.city,
            currentJob: user.currentJob,
            description: user.description,
            english_level: user.english_level,
            seniority: user.seniority,
            stack: user.stack,
            profile_pic: user.profile_pic,
            banner: user.banner,
        }
    )

    const [error, setError] = useState({
        fullName:false,
    })

    const [addedTechs, setAddedTechs] = useState([]);

    const addCurrentTechs = () => {
        if(user === undefined) return null

        let currentTechs = user.technologies.map(t => t.name)

        for (let i = 0; i < currentTechs.length; i++) {
            
            const techObj = {
                tech: currentTechs[i],
                id: techId++,
            };

            setAddedTechs((value) => [...value, techObj]);
        }
    };

    const addTechs = (e) => {

        for (let i = 0; i < user.technologies.length; i++) {
            if (user.technologies[i].name === e.target.value) return null
        }

        const techObj = {
            tech: e.target.value,
            id: techId++,
        };

        setAddedTechs((value) => [...value, techObj]);
    };

    const handleDelete = (id) => {
        const deletedTechs = addedTechs.filter((tech) => tech.id !== id);
        setAddedTechs(deletedTechs);
    };

    function handleErrors(e){
        if(e.target.name === 'fullName'){
            if (e.target.value.length === 0) setError({...error, fullName:true})
            else setError({...error, fullName:false})
        }
    }
    
    function handleChange(e){
        e.preventDefault();
        handleErrors(e)
        setCurrentInfo({
            ...currentInfo,
            [e.target.name]:e.target.value
        })
    };
    
    async function handleSubmit(e){
        e.preventDefault();
        if (error.fullName === true) return Swal.fire({icon: 'error', text:'Please check the fields'})
        let post = currentInfo
        post.technologies = addedTechs.map((tech) => tech.tech)
        await axios.put(`http://localhost:3001/users/${id}`, post)
        .then(res => Swal.fire({
            icon: 'success',
            text: 'Changes has been saved'
        }))
        .catch(err => Swal.fire({
            icon: 'error',
            title: 'An error has occurred',
            text: err.data
        }))
        dispatch(fetchUser(id))
        navigate(`/home/profile/${id}`)
    }
    
    if(user === undefined) return <h1>Loading...</h1>
    
    
    return (
        
        <div className={styles.formContainer}>
            <form className={styles.form}>
                <label>Fullname</label>
                <input name='fullName' value={currentInfo.fullName} onChange={handleChange}></input>
                {error.fullName === true ? <label id={styles.error}>You cannot delete this field</label> : null}
                <label>Country</label>
                <select value={currentInfo.country} id="country" name="country" onChange={handleChange}>
                <option value="Afganistan">Afghanistan</option>
                <option value="Albania">Albania</option>
                <option value="Algeria">Algeria</option>
                <option value="American Samoa">American Samoa</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Anguilla">Anguilla</option>
                <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Aruba">Aruba</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaijan">Azerbaijan</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bahrain">Bahrain</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Barbados">Barbados</option>
                <option value="Belarus">Belarus</option>
                <option value="Belgium">Belgium</option>
                <option value="Belize">Belize</option>
                <option value="Benin">Benin</option>
                <option value="Bermuda">Bermuda</option>
                <option value="Bhutan">Bhutan</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bonaire">Bonaire</option>
                <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                <option value="Botswana">Botswana</option>
                <option value="Brazil">Brazil</option>
                <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                <option value="Brunei">Brunei</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Cameroon">Cameroon</option>
                <option value="Canada">Canada</option>
                <option value="Canary Islands">Canary Islands</option>
                <option value="Cape Verde">Cape Verde</option>
                <option value="Cayman Islands">Cayman Islands</option>
                <option value="Central African Republic">Central African Republic</option>
                <option value="Chad">Chad</option>
                <option value="Channel Islands">Channel Islands</option>
                <option value="Chile">Chile</option>
                <option value="China">China</option>
                <option value="Christmas Island">Christmas Island</option>
                <option value="Cocos Island">Cocos Island</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoros">Comoros</option>
                <option value="Congo">Congo</option>
                <option value="Cook Islands">Cook Islands</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Cote DIvoire">Cote DIvoire</option>
                <option value="Croatia">Croatia</option>
                <option value="Cuba">Cuba</option>
                <option value="Curaco">Curacao</option>
                <option value="Cyprus">Cyprus</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Djibouti">Djibouti</option>
                <option value="Dominica">Dominica</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="East Timor">East Timor</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egypt">Egypt</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Equatorial Guinea">Equatorial Guinea</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Estonia">Estonia</option>
                <option value="Ethiopia">Ethiopia</option>
                <option value="Falkland Islands">Falkland Islands</option>
                <option value="Faroe Islands">Faroe Islands</option>
                <option value="Fiji">Fiji</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="French Guiana">French Guiana</option>
                <option value="French Polynesia">French Polynesia</option>
                <option value="French Southern Ter">French Southern Ter</option>
                <option value="Gabon">Gabon</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Ghana">Ghana</option>
                <option value="Gibraltar">Gibraltar</option>
                <option value="Great Britain">Great Britain</option>
                <option value="Greece">Greece</option>
                <option value="Greenland">Greenland</option>
                <option value="Grenada">Grenada</option>
                <option value="Guadeloupe">Guadeloupe</option>
                <option value="Guam">Guam</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guyana">Guyana</option>
                <option value="Haiti">Haiti</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Honduras">Honduras</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="Hungary">Hungary</option>
                <option value="Iceland">Iceland</option>
                <option value="Indonesia">Indonesia</option>
                <option value="India">India</option>
                <option value="Iran">Iran</option>
                <option value="Iraq">Iraq</option>
                <option value="Ireland">Ireland</option>
                <option value="Isle of Man">Isle of Man</option>
                <option value="Israel">Israel</option>
                <option value="Italy">Italy</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japan">Japan</option>
                <option value="Jordan">Jordan</option>
                <option value="Kazakhstan">Kazakhstan</option>
                <option value="Kenya">Kenya</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Korea North">Korea North</option>
                <option value="Korea Sout">Korea South</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Kyrgyzstan">Kyrgyzstan</option>
                <option value="Laos">Laos</option>
                <option value="Latvia">Latvia</option>
                <option value="Lebanon">Lebanon</option>
                <option value="Lesotho">Lesotho</option>
                <option value="Liberia">Liberia</option>
                <option value="Libya">Libya</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lithuania">Lithuania</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Macau">Macau</option>
                <option value="Macedonia">Macedonia</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Malawi">Malawi</option>
                <option value="Maldives">Maldives</option>
                <option value="Mali">Mali</option>
                <option value="Malta">Malta</option>
                <option value="Marshall Islands">Marshall Islands</option>
                <option value="Martinique">Martinique</option>
                <option value="Mauritania">Mauritania</option>
                <option value="Mauritius">Mauritius</option>
                <option value="Mayotte">Mayotte</option>
                <option value="Mexico">Mexico</option>
                <option value="Midway Islands">Midway Islands</option>
                <option value="Moldova">Moldova</option>
                <option value="Monaco">Monaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montserrat">Montserrat</option>
                <option value="Morocco">Morocco</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Myanmar">Myanmar</option>
                <option value="Nambia">Nambia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Netherland Antilles">Netherland Antilles</option>
                <option value="Netherlands">Netherlands (Holland, Europe)</option>
                <option value="Nevis">Nevis</option>
                <option value="New Caledonia">New Caledonia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Niger">Niger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Niue">Niue</option>
                <option value="Norfolk Island">Norfolk Island</option>
                <option value="Norway">Norway</option>
                <option value="Oman">Oman</option>
                <option value="Pakistan">Pakistan</option>
                <option value="Palau Island">Palau Island</option>
                <option value="Palestine">Palestine</option>
                <option value="Panama">Panama</option>
                <option value="Papua New Guinea">Papua New Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Peru">Peru</option>
                <option value="Phillipines">Philippines</option>
                <option value="Pitcairn Island">Pitcairn Island</option>
                <option value="Poland">Poland</option>
                <option value="Portugal">Portugal</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="Qatar">Qatar</option>
                <option value="Republic of Montenegro">Republic of Montenegro</option>
                <option value="Republic of Serbia">Republic of Serbia</option>
                <option value="Reunion">Reunion</option>
                <option value="Romania">Romania</option>
                <option value="Russia">Russia</option>
                <option value="Rwanda">Rwanda</option>
                <option value="St Barthelemy">St Barthelemy</option>
                <option value="St Eustatius">St Eustatius</option>
                <option value="St Helena">St Helena</option>
                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                <option value="St Lucia">St Lucia</option>
                <option value="St Maarten">St Maarten</option>
                <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                <option value="Saipan">Saipan</option>
                <option value="Samoa">Samoa</option>
                <option value="Samoa American">Samoa American</option>
                <option value="San Marino">San Marino</option>
                <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Senegal">Senegal</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leone">Sierra Leone</option>
                <option value="Singapore">Singapore</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Solomon Islands">Solomon Islands</option>
                <option value="Somalia">Somalia</option>
                <option value="South Africa">South Africa</option>
                <option value="Spain">Spain</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudan">Sudan</option>
                <option value="Suriname">Suriname</option>
                <option value="Swaziland">Swaziland</option>
                <option value="Sweden">Sweden</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Syria">Syria</option>
                <option value="Tahiti">Tahiti</option>
                <option value="Taiwan">Taiwan</option>
                <option value="Tajikistan">Tajikistan</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Thailand">Thailand</option>
                <option value="Togo">Togo</option>
                <option value="Tokelau">Tokelau</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Turkey">Turkey</option>
                <option value="Turkmenistan">Turkmenistan</option>
                <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Uganda">Uganda</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Ukraine">Ukraine</option>
                <option value="United Arab Erimates">United Arab Emirates</option>
                <option value="United States of America">United States of America</option>
                <option value="Uraguay">Uruguay</option>
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Vatican City State">Vatican City State</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                <option value="Wake Island">Wake Island</option>
                <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                <option value="Yemen">Yemen</option>
                <option value="Zaire">Zaire</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabwe">Zimbabwe</option>
                </select>
                <label>City</label>
                <input name="city" value={currentInfo.city} onChange={handleChange} ></input>
                <label>Seniority</label>
                <select name="seniority" value={currentInfo.seniority} onChange={handleChange} >
                    <option value='Not Specified' >Not Specified</option>
                    <option value='Junior' >Junior</option>
                    <option value='Semi-Senior' >Semi-Senior</option>
                    <option value='Senior' >Senior</option>
                </select>
                <label>Area</label>
                <input placeholder="Example: Mobile developer" name = 'stack' value={currentInfo.stack} onChange={handleChange} ></input>
                <label>Current job</label>
                <input placeholder="Example: CEO at Microsoft" name="currentJob" value={currentInfo.currentJob} onChange={handleChange} ></input>
                <label>English level</label>
                <select name="english_level" value={currentInfo.english_level} onChange={handleChange} >
                    <option value='Not specified' >Not specified</option>
                    <option value='Basic'>Basic</option>
                    <option value='Conversational'>Conversational</option>
                    <option value='Advanced or Native'>Advanced or Native</option>
                </select>
                <label>Profile pic</label>
                <input name="profile_pic" placeholder="You can add url here" type='url' onChange={handleChange}></input>
                <label>Banner pic</label>
                <input name="banner" placeholder="You can add url here" type='url' onChange={handleChange}></input>
                <label>Description</label>
                <textarea name="description" value={currentInfo.description} onChange={handleChange}></textarea>
                <label>Add skills</label>
                <select className={styles.form_select} onChange={addTechs}>
                <option selected disabled>
                    Technologies
                </option>
                {techs.map((e) =>
                    e.name === "Cplus" ? (
                    <option key={e.id} value={e.name}>
                        C+
                    </option>
                    ) : e.name === "Cplusplus" ? (
                    <option key={e.id} value={e.name}>
                        C++
                    </option>
                    ) : e.name === "CSharp" ? (
                    <option key={e.id} value={e.name}>
                        C#
                    </option>
                    ) : (
                    <option key={e.id} value={e.name}>
                        {e.name}
                    </option>
                    )
                )}
                </select>

            <div className={styles.added_techs}>
                {addedTechs.map((e, i) => (
                    <div key={i}>
                    {e.tech === "Cplus" ? (
                        <p>C+</p>
                    ) : e.tech === "Cplusplus" ? (
                        <p>C++</p>
                    ) : e.tech === "CSharp" ? (
                        <p>C#</p>
                    ) : (
                        <p>{e.tech}</p>
                    )}
                    {e.tech === "" ? (
                        <></>
                    ) : (
                        <MdClose onClick={() => handleDelete(e.id)} />
                    )}
                    </div>
                ))}
            </div>
                <button type = 'submit' onClick={handleSubmit}>Save changes</button>
            </form>
        </div>
    );
}

export default EditDevProfileForm;