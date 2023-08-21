import React, { useState, useEffect } from 'react'
import newRequest from '../../utils/newRequest';
import {useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { serviceFormSchema } from "../../schemas/index";
import getCurrentUser from '../../utils/getCurrentUser';


export default function Services() {

  const getuser = getCurrentUser();
  const defaultfirstname = getuser.firstname;
  const defaultlastname = getuser.lastname;
  const defaultEmail = getuser.email
  
  const initialValues = {
    firstname: defaultfirstname,
    lastname: defaultlastname,
    email: defaultEmail,
    phone: "",
    city: "",
    vehiclemake: "",
    vehiclemodel: "",
    vehiclevarient:"",
    serviceType:"",
    servicefield:"",
  };

  const variantOptions = {
    Honda: [
      "Civic", "Accord", "CR-V", "City", "HR-V", "BR-V", "WR-V", "Amaze", "Brio", "Jazz",
      "Insight", "Fit", "Pilot", "Odyssey", "Ridgeline", "Passport", "Element", "S2000", "NSX", "Integra"
    ],
    Toyota: [
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

  const [error, setError] = useState(null);
  const [selectedMake, setSelectedMake] = useState("");
  const [service, setService] = useState({
    firstname: defaultfirstname,
    lastname: defaultlastname,
    email: defaultEmail,
    phone: "",
    city: "",
    vehiclemake: "",
    vehiclemodel: "",
    vehiclevarient:"",
    serviceType:"",
    servicefield:"",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const navigate = useNavigate();



  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: serviceFormSchema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit : (values) =>{
        console.log("🚀", values);
      }

    });


    const handleChangeValue = (e) => {
      setService((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };

    const handleSubmitValue = async (e) => {
      e.preventDefault();
  
      try {
        await newRequest.post("/service/registerService", {
          ...service

        });

      } catch (err) {
        setError(err.response.data);
      };

      try{
         await newRequest.post("/mail/sendMail", {
           ...service

         });
         const message = "Thank You. We'll reply you shortly.";
         const isConfirmed = window.confirm(message);
     
         if (isConfirmed) {
           navigate("/");
         }
      }catch (err) {
        setError(err.response.data);
      };

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
  Services Form
</h1>
<form className="row g-3 needs-validation" onSubmit={(e) => {handleSubmit() && handleSubmit(e) ; handleChangeValue && handleSubmitValue(e)}}>

  <div className="col-md-4">
    <label  className="form-label" style={{ fontWeight: '600' }}>First name</label>
    <input type="text" className="form-control" autoComplete="nope" name="firstname" id="firstname" placeholder='John'  value={values.firstname}
      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      onBlur={handleBlur} required/>
       {touched.firstname && errors.firstname ? ( 
        <p className="form-error" style={{color:"red"}}>{errors.firstname}</p>
        ) : null}

  </div>
  
  <div className="col-md-4">
    <label  className="form-label" style={{ fontWeight: '600' }}>Last name</label>
    <input type="text" className="form-control" autoComplete="nope" name="lastname" id="lastname" placeholder='wick' value={values.lastname}
      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      onBlur={handleBlur} required/>
       {touched.lastname && errors.lastname ? ( 
        <p className="form-error" style={{color:"red"}}>{errors.lastname}</p>
        ) : null}

  </div>
  <div className="col-md-4">
    <label  className="form-label" style={{ fontWeight: '600' }}>Email</label>
    <input type="email" className="form-control" autoComplete="nope" name="email" placeholder='e.g xyz@gmail.com' id="email" value={values.email}
      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      onBlur={handleBlur} required/>
             {touched.email && errors.email ? ( 
        <p className="form-error" style={{color:"red"}}>{errors.email}</p>
        ) : null}

  </div>

  <div className="col-md-4">
    <label  className="form-label" style={{ fontWeight: '600' }}>Phone Number</label>
    <input name="phone" type="tel" className="form-control" autoComplete="nope" placeholder='eg. 03xx xxxxxxx' id="phone" value={values.phone}
      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      onBlur={handleBlur} required/>
                   {touched.phone && errors.phone ? ( 
        <p className="form-error" style={{color:"red"}}>{errors.phone}</p>
        ) : null}
  </div>

  <div className="col-md-4">
    <label  className="form-label" htmlFor="city" style={{ fontWeight: '600' }}>City</label>
    <select type="text" className="form-control" autoComplete="nope" placeholder='eg. Islamabad' name="city" id="city-list" value={values.city} onKeyUp={filterCities}
      onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      onBlur={handleBlur} required> 
      <option value="">Select a city</option>
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
                   {touched.city && errors.city ? ( 
        <p className="form-error" style={{color:"red"}}>{errors.city}</p>
        ) : null}

  </div>


  <div className="col-md-4">
    <label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Make</label>
    <select type="text" className="form-control" autoComplete="nope" id="vehiclemake" name="vehiclemake" placeholder="eg. Honda" value={values.vehiclemake}
     onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e); handleMakeChange(e); }} onBlur={handleBlur} required>
      <option value="">Select Vehicle Make</option>
      <option value="Honda">Honda</option>
      <option value="Toyota">Toyota</option>
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
    <label className="form-label" style={{ fontWeight: '600' }}>Vehicle Varient</label>
    <select type="text" className="form-control" id="vehiclevarient" name="vehiclevarient" value={values.vehiclevarient}
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
  <select type="number" className="form-control" autoComplete="nope" placeholder="eg. 2023"  name="vehiclemodel" id="vehiclemodel" value={values.vehiclemodel}
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
    <label className='radio_buttons pb-3 pt-3 'style={{ fontWeight: '600' }} required>Please Select Service</label><br/>
  <div className="form-check form-check-inline pb-3">
    <input className="form-check-input" type="radio" name="serviceType" id="serviceType1" value="Car Inspection" onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      onBlur={handleBlur}/>
    <label className="form-check-label" htmlFor="serviceType1">Car Inspection</label>
  </div>
  <div className="form-check form-check-inline">
    <input className="form-check-input" type="radio" name="serviceType" id="serviceType2" value="Car Repair" onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      onBlur={handleBlur}/>
    <label className="form-check-label" htmlFor="serviceType2">Car Repair</label>
  </div>
  <div className="form-check form-check-inline">
    <input className="form-check-input" type="radio" name="serviceType" id="serviceType3" value="Both" onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      onBlur={handleBlur}/>
    <label className="form-check-label" htmlFor="serviceType3">Both</label>
  </div>
</div>

  <div className="col-md-4">
    <label className="form-label" style={{ fontWeight: '600' }}>Service Requested</label>
    <textarea className="form-control" name="servicefield" id="servicefield" placeholder="Type Here" value={values.servicefield} onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      onBlur={handleBlur}/>
         {touched.servicefield && errors.servicefield ? ( 
        <p className="form-error" style={{color:"red"}}>{errors.servicefield}</p>
        ) : null}

  </div>


  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
      <label className="form-check-label"  style={{ fontWeight: '400' }}>
        Agree to terms and conditions
      </label>
      <div className="invalid-feedback" style={{ fontWeight: '400' }}>
        You must agree before submitting.
      </div>
    </div>
  </div>
  <div className="col-12 pb-5 pt-3">
    <button className="btn btn-primary" type="submit" >Submit</button>
  </div>
  <label className='erros' style={{color:"red"}}>{error && error}</label> 
 
  </form>
   </div>
   
  )
}
