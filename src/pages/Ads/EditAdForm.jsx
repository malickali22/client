import React, { useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useFormik } from "formik"

import { EditAdFormSchema } from "../../schemas/index";

const EditAdForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [selectedMake, setSelectedMake] = useState("");


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);     //for scrolling to top

  const variantOptions = {
    Honda: [
      "Civic", "Accord", "CR-V", "City", "HR-V", "BR-V", "WR-V", "Amaze", "Brio", "Jazz",
      "Insight", "Fit", "Pilot", "Odyssey", "Ridgeline", "Passport", "Element", "S2000", "NSX", "Integra"
    ],
    Corolla: [
      "Altis", "Camry","Corolla", "Corolla Cross", "Yaris", "Grande","Mark x", "Fortuner", "Innova", "Rush", "Hilux", "Avanza",
      "Vigo", "Land Cruiser", "86", "Supra", "C-HR", "RAV4", "Prado", "Sienna", "Tacoma", "Tundra"
    ],
    Suzuki: [
      "Swift", "Vitara", "Jimny", "Ciaz", "Ertiga", "Baleno", "Ignis", "S-Presso", "XL6", "Celerio",
      "Alto", "S-Cross", "SX4", "Grand Vitara", "APV", "Every", "Cultus", "Kizashi", "Splash", "Forenza"
    ],
    Mercedes: [
      "C-Class", "E-Class", "S-Class", "A-Class", "GLC", "GLE", "GLA", "CLS", "G-Class", "AMG GT",
      "SLC", "SL", "B-Class", "CLA", "GLS", "Maybach S-Class", "GLE Coupe", "GLB", "GL", "V-Class"
    ],
    BMW: [
      "3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "Z4", "i3", "i8", "M5",
      "1 Series", "2 Series", "4 Series", "6 Series", "8 Series", "X2", "X4", "X6", "X7", "M2"
    ],
    Volvo: [
      "S60", "XC40", "XC60", "XC90", "V60", "V90", "S90", "C30", "C70", "V40",
      "S40", "V50", "S80", "XC70", "S70", "S60 Cross Country", "V70", "S90 Recharge", "XC40 Recharge", "XC90 Recharge"
    ],
    Mitsubishi: [
      "Lancer", "Outlander", "Pajero", "Eclipse Cross", "Mirage", "Attrage", "Triton", "ASX", "Xpander", "Strada",
      "Galant", "3000GT", "Endeavor", "Diamante", "Montero", "Raider", "Space Star", "RVR", "Grandis", "Cordia"
    ],
    Audi: [
      "A4", "A6", "A8", "Q5", "Q7", "Q8", "TT", "R8", "RS6", "S5",
      "A3", "A5", "A7", "RS3", "RS5", "RS7", "Q3", "Q2", "SQ5", "SQ7"
    ],
    Lexus: [
      "IS", "ES", "LS", "NX", "RX", "UX", "LC", "GS", "RC", "LX",
      "CT", "GX", "HS", "SC", "RC F", "GS F", "LFA", "LM", "UX 300e", "LF-30"
    ],
    RollsRoyce: [
      "Phantom", "Ghost", "Wraith", "Dawn", "Cullinan", "Silver Seraph", "Silver Spur", "Corniche", "Camargue", "Silver Shadow",
      "Silver Spirit", "Park Ward", "Mulliner Park Ward", "Silver Wraith", "Twenty", "New Phantom", "Silver Cloud", "Bentley State Limousine", "Azure", "Taycan"
    ],
    Lamborghini: [
      "Aventador", "Huracan", "Urus", "Gallardo", "Murcielago", "Centenario", "Reventon", "Veneno", "Sesto Elemento", "Diablo",
      "Countach", "Miura", "Espada", "Jalpa", "Silhouette", "Urraco", "400 GT", "Islero", "LM002", "Egoista"
    ],
  };

  const initialValues = {
    title: "",
    contact: "",
    price: "",
    location:"",
    desc: "",
    vehiclemake: "",
    vehiclemodel: "",
    vehiclevarient:"",
    shortDesc: "",
    registeryear: "",
    registercity: "",
    transmission: "",
    mileage:"",
    fueltype:"",
    ownername:""

  }

  const [formData, setFormData] = useState({
    title: "",
    contact: "",
    price: "",
    location:"",
    desc: "",
    vehiclemake: "",
    vehiclemodel: "",
    vehiclevarient:"",
    shortDesc: "",
    registeryear: "",
    registercity: "",
    transmission: "",
    mileage:"",
    fueltype:"",
    ownername:""
  });

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const response = await newRequest.get(`/posts/single/${id}`);
        const adData = response.data;

        // Set the formData state with the fetched ad data
        setFormData(adData);
    
        // Set the selectedMake state based on the fetched vehiclemake from the ad data
        setSelectedMake(adData.vehiclemake);
      } catch (error) {
        console.error('Error fetching ad data:', error);
      }
    };

    // Call fetchAdData when the component mounts to pre-fill the form
    fetchAdData();
  }, [id]);

  const { handleBlur, handleChange, errors, touched } =
  useFormik({
    initialValues,
    validationSchema: EditAdFormSchema,
    validateOnChange: true,
    validateOnBlur: false,

  });





  // Function to remove an image by its URL


  const handleSubmitValue = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the ad data
      await newRequest.put(`/ads/${id}`, formData);

      const message = "*Your Ad is updated*";
      const isConfirmed = window.confirm(message);
      if(isConfirmed){
        navigate('/myads');
      }
    } catch (err) {
        setError(err.response.data);
      console.error('Error updating ad:', error);
    }
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
  
    // Check if the changed field is "vehiclemake"
    if (name === "vehiclemake") {
      setSelectedMake(value); // Update the selectedMake state with the selected value
      // Clear the selected vehicle variant when the make changes
      setFormData({ ...formData, [name]: value, vehiclevarient: "" });
    } else {
      setFormData({ ...formData, [name]: value });
      console.log(formData)
    }
  };
  

  const handleMakeChange = (e) => {
    const make = e.target.value;
    setSelectedMake(make);
  };

  function filterCities() {
    // Get the input value from the select element
    var input = document.getElementById("city-list").value.toLowerCase();
  
    // Get all the options in the select element
    var options = document.getElementById("city-list").options;
  
    // Loop through the options and hide/show them based on whether they match the input
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      var value = option.value.toLowerCase();
      if (value.indexOf(input) === 0 || input === "") {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    }
  }





  return (
    <div className='container pb-5'>
      <h1 className='text-center pt-5 pb-5' style={{ fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
       Ad Form
     </h1>
     <form className="row g-3 needs-validation" onSubmit={handleSubmitValue}>

        <div className=" info row g-3">
    
    <div className="col-md-4">
      <label  className="form-label" style={{ fontWeight: '600' }}>Title</label>
      <input type="text" className="form-control" value={formData.title} placeholder='eg. Civic for sale' id="Title" name='title' 
      onBlur={handleBlur}
      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
       required/>
              {touched.title && errors.title ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.title}</p>
    ) : null}
    </div>
    

    <div className="col-md-4">
<label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Make</label>
<select type="text" className="form-control" value={formData.vehiclemake} autoComplete="nope" id="vehiclemake" name="vehiclemake" placeholder="eg. Honda" 
 onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e); handleMakeChange(e); }} onBlur={handleBlur} required>
  <option value="">Select Vehicle Make</option>
  <option value="Honda">Honda</option>
  <option value="Corolla">Toyota</option>
  <option value="Suzuki">Suzuki</option>
  <option value="Mercedes">Mercedes</option>
  <option value="BMW">BMW</option>
  <option value="Volvo">Volvo</option>
  <option value="Mitsubishi">Mitsubishi</option> 
  <option value="Audi">Audi</option>
  <option value="Lexus">Lexus</option>
  <option value="RollsRoyce">Rolls Royce</option>
  <option value="Lamborghini">Lamborghini</option>
       </select>
   {touched.vehiclemake && errors.vehiclemake ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.vehiclemake}</p>
    ) : null}
</div>


<div className="col-md-4">
<label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Varient</label>
<select type="text" className="form-control" id="vehiclevarient" value={formData.vehiclevarient} name="vehiclevarient" 
  onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
  onBlur={handleBlur} required>
    <option value="">Select Vehicle Varient</option>
    {selectedMake && variantOptions[selectedMake]?.map((variant) => (
      <option key={variant} value={variant}>
        {variant}
  </option>
))}
</select>
               {touched.vehiclevarient && errors.vehiclevarient ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.vehiclevarient}</p>
    ) : null}

</div>
 
<div className="col-md-4">
<label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Model</label>
<select type="number" className="form-control" value={formData.vehiclemodel} autoComplete="nope" placeholder="eg. 2023"  name="vehiclemodel" id="vehiclemodel" 
  onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
  onBlur={handleBlur} required>
   <option value="">Select Manufacturing Year</option>
   <option value="2023">2023</option>
   <option value="2022">2022</option>
   <option value="2021">2021</option>
   <option value="2020">2020</option>
   <option value="2019">2019</option>
   <option value="2018">2018</option>
   <option value="2017">2017</option>
   <option value="2016">2016</option>
   <option value="2015">2015</option>
   <option value="2014">2014</option>
   <option value="2013">2013</option>
   <option value="2012">2012</option>
   <option value="2011">2011</option>
   <option value="2010">2010</option>
   <option value="2009">2009</option>
   <option value="2008">2008</option>
   <option value="2007">2007</option>
   <option value="2006">2006</option>
   <option value="2005">2005</option>
   <option value="2004">2004</option>
   <option value="2003">2003</option>
   <option value="2002">2002</option>
   <option value="2001">2001</option>
   <option value="2000">2000</option>
   <option value="1999">1999</option>
   <option value="1998">1998</option>
   <option value="1997">1997</option>
   <option value="1996">1996</option>
   <option value="1995">1995</option>
   <option value="1994">1994</option>
   <option value="1993">1993</option>
   <option value="1992">1992</option>
   <option value="1991">1991</option>
   <option value="1990">1990</option>
   <option value="1989">1989</option>
   <option value="1988">1988</option>
   <option value="1987">1987</option>
   <option value="1986">1986</option>
   <option value="1985">1985</option>
   <option value="1984">1984</option>
   <option value="1983">1983</option>
   <option value="1982">1982</option>
   <option value="1981">1981</option>
   <option value="1980">1980</option>

    </select>
               {touched.vehiclemodel && errors.vehiclemodel ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.vehiclemodel}</p>
    ) : null}
</div>

<div className="col-md-4">
<label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Registeration Year</label>
<select type="number" className="form-control" value={formData.registeryear} autoComplete="nope" placeholder="eg. 2023" name="registeryear" id="registeryear" 
  onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
  onBlur={handleBlur} required>
   <option value="">Select Registeration Year</option>
   <option value="2023">2023</option>
   <option value="2022">2022</option>
   <option value="2021">2021</option>
   <option value="2020">2020</option>
   <option value="2019">2019</option>
   <option value="2018">2018</option>
   <option value="2017">2017</option>
   <option value="2016">2016</option>
   <option value="2015">2015</option>
   <option value="2014">2014</option>
   <option value="2013">2013</option>
   <option value="2012">2012</option>
   <option value="2011">2011</option>
   <option value="2010">2010</option>
   <option value="2009">2009</option>
   <option value="2008">2008</option>
   <option value="2007">2007</option>
   <option value="2006">2006</option>
   <option value="2005">2005</option>
   <option value="2004">2004</option>
   <option value="2003">2003</option>
   <option value="2002">2002</option>
   <option value="2001">2001</option>
   <option value="2000">2000</option>
   <option value="1999">1999</option>
   <option value="1998">1998</option>
   <option value="1997">1997</option>
   <option value="1996">1996</option>
   <option value="1995">1995</option>
   <option value="1994">1994</option>
   <option value="1993">1993</option>
   <option value="1992">1992</option>
   <option value="1991">1991</option>
   <option value="1990">1990</option>
   <option value="1989">1989</option>
   <option value="1988">1988</option>
   <option value="1987">1987</option>
   <option value="1986">1986</option>
   <option value="1985">1985</option>
   <option value="1984">1984</option>
   <option value="1983">1983</option>
   <option value="1982">1982</option>
   <option value="1981">1981</option>
   <option value="1980">1980</option>

    </select>
               {touched.registeryear && errors.registeryear ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.registeryear}</p>
    ) : null}
</div>

<div className="col-md-4">
<label className="form-label" htmlFor="city" style={{ fontWeight: '600' }}>Vehicle Registeration City</label>
<select name="registercity" className="form-control" value={formData.registercity} id="registercitylist" onKeyUp={filterCities} onBlur={handleBlur} onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}} required>
<option value="">Select Registeration City</option>
<option value="Islamabad">Islamabad</option>
<option value="Karachi">Karachi</option>
<option value="Lahore">Lahore</option>
<option value="Faisalabad">Faisalabad</option>
<option value="Rawalpindi">Rawalpindi</option>
<option value="Multan">Multan</option>
<option value="Gujranwala">Gujranwala</option>
<option value="Hyderabad">Hyderabad</option>
<option value="Peshawar">Peshawar</option>
<option value="Abbottabad">Abbottabad</option>
<option value="Quetta">Quetta</option>
<option value="Sialkot">Sialkot</option>
<option value="Sukkur">Sukkur</option>
<option value="Bahawalpur">Bahawalpur</option>
<option value="Muzaffarabad">Muzaffarabad</option>
<option value="Mirpur">Mirpur</option>
<option value="Gujrat">Gujrat</option>
<option value="Jhang">Jhang</option>
<option value="Sheikhupura">Sheikhupura</option>
<option value="Larkana">Larkana</option>
</select>
{touched.registercity && errors.registercity? ( 
    <p className="form-error" style={{color:"red"}}>{errors.registercity}</p>
    ) : null}

</div>

<div className="col-md-4">
<label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Transmission</label>
<select type="text" className="form-control" value={formData.transmission} autoComplete="nope" id="transmission" name="transmission"
 onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e); handleMakeChange(e); }} onBlur={handleBlur} required>
  <option value="">Select Vehicle Transmission</option>
  <option value="Manual">Manual Transmission</option>
  <option value="Automatic">Automatic Transmission</option>
  <option value="CVT">Continuously Variable Transmission</option>
  <option value="Semi-Automatic">Semi-Automatic transmission</option>
  <option value="Dual-Clutch">Dual Clutch transmission</option>
  </select>
   {touched.transmission && errors.transmission ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.transmission}</p>
    ) : null}
</div>

<div className="col-md-4">
<label className="form-label" style={{ fontWeight: '600' }}>Vehicle Fuel Type</label>
<select type="text" className="form-control" value={formData.fueltype} autoComplete="nope" id="fueltype" name="fueltype"
 onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e); handleMakeChange(e); }} onBlur={handleBlur} required>
  <option value="">Select Vehicle Fuel type</option>
  <option value="Petrol">Petrol</option>
  <option value="Diesel">Diesel</option>
  <option value="CNG">CNG</option>
  <option value="CNG/Petrol">CNG/Petrol</option>
  <option value="Hybrid">Hybrid</option>
  <option value="Electric">Electric</option>
  </select>
   {touched.fueltype && errors.fueltype ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.fueltype}</p>
    ) : null}
</div>

<div className="col-md-4">
      <label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Mileage (km)</label>
      <input name="mileage" type="number" value={formData.mileage} className="form-control" id="mileage" required 
       onBlur={handleBlur}
       onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
       style={{       appearance: 'textfield', MozAppearance: 'textfield', WebkitAppearance: 'none', }}
      />
    {touched.mileage && errors.mileage ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.mileage}</p>
    ) : null}
    </div>

<div className="col-md-4">
<label  className="form-label" style={{ fontWeight: '600' }}>Price</label>
<input name="price" type="number" value={formData.price} className="form-control" id="Price" required 
 onBlur={handleBlur}
 onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
/>
{touched.price && errors.price ? ( 
<p className="form-error" style={{color:"red"}}>{errors.price}</p>
) : null}
 </div>

<div className="col-md-4">
      <label  className="form-label" style={{ fontWeight: '600' }}>Detailed Discription</label>
      <textarea name='desc' value={formData.desc} className="form-control" id="Service" placeholder="Type Here"  
      onBlur={handleBlur}
      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
       />
       
      {touched.desc && errors.desc ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.desc}</p>
    ) : null}

</div>

<div className="col-md-4">
<label  className="form-label"  style={{ fontWeight: '600' }}>Short Discription</label>
<textarea name='shortDesc'value={formData.shortDesc} className="form-control" id="sdiscription" 
 onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
 onBlur={handleBlur}
 placeholder="Type Here"/>
  {touched.shortDesc && errors.shortDesc ? ( 
  <p className="form-error" style={{color:"red"}}>{errors.shortDesc}</p>
 ) : null}
</div>

<div className="col-md-4">
<label className="form-label" htmlFor="city" style={{ fontWeight: '600' }}>City</label>
<select name="location" value={formData.location} placeholder="Post place" className="form-control" id="city-list" onKeyUp={filterCities} onBlur={handleBlur} onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}} required>
<option value="">Select your City</option>
<option value="Islamabad">Islamabad</option>
<option value="Karachi">Karachi</option>
<option value="Lahore">Lahore</option>
<option value="Faisalabad">Faisalabad</option>
<option value="Rawalpindi">Rawalpindi</option>
<option value="Multan">Multan</option>
<option value="Gujranwala">Gujranwala</option>
<option value="Hyderabad">Hyderabad</option>
<option value="Peshawar">Peshawar</option>
<option value="Abbottabad">Abbottabad</option>
<option value="Quetta">Quetta</option>
<option value="Sialkot">Sialkot</option>
<option value="Sukkur">Sukkur</option>
<option value="Bahawalpur">Bahawalpur</option>
<option value="Muzaffarabad">Muzaffarabad</option>
<option value="Mirpur">Mirpur</option>
<option value="Gujrat">Gujrat</option>
<option value="Jhang">Jhang</option>
<option value="Sheikhupura">Sheikhupura</option>
<option value="Larkana">Larkana</option>
</select>
{touched.location && errors.location ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.location}</p>
    ) : null}

</div>
<div className="col-md-4">
      <label  className="form-label"  style={{ fontWeight: '600' }}>Your Name</label>
      <input type="text" name='ownername' value={formData.ownername} className="form-control" id="ownername" placeholder="eg. Alex"  
      onBlur={handleBlur}
      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
       />
       
      {touched.ownername && errors.ownername ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.ownername}</p>
    ) : null}

</div>
<div className="col-md-4">
      <label  className="form-label" style={{ fontWeight: '600' }}>Contact Number</label>
      <input name="contact" type="tel" value={formData.contact} className="form-control" id="contact" required 
       onBlur={handleBlur}
       onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      />
    {touched.contact && errors.contact ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.contact}</p>
    ) : null}
    </div>


</div>

    <div className="col-12 pb-5 pt-3">
    <button className="btn btn-primary" type="submit" >Update</button>
  </div>
  <label className='erros' style={{color:"red"}}>{error && error}</label> 
      </form>
    </div>
  );
};

export default EditAdForm;
