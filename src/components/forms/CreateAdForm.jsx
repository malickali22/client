//export default function Createadform()
import React, { useState,useEffect,useRef } from 'react'
import {useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import { useFormik } from "formik"
import upload from '../../utils/upload'
import { adFormSchema } from "../../schemas/index";
import getCurrentUser from '../../utils/getCurrentUser';
export default function Createadform() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [selectedMake, setSelectedMake] = useState("");
  const [errorMessageCover, setErrorMessageCover] = useState(null);
  const [errorMessageImages, setErrorMessageImages] = useState(null);
  const [SingleFile, setSingleFile]=useState(undefined);
  const [files, setFiles]=useState([]);
  const [uploading, setUploading]=useState(false);
  const coverInputRef = useRef(null);
  const getuser = getCurrentUser();
  const defaultfirstname = getuser.firstname;
  const defaultlastname = getuser.lastname;


  const [uploadClicked, setUploadClicked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);     //for scrolling to top

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
    cover: "",
    images: "",
    registeryear: "",
    registercity: "",
    transmission: "",
    mileage:"",
    fueltype:"",
    ownername:defaultfirstname && defaultlastname

  }

  const [formData, setFormData] = useState({
    title: "",
    contact: "",
    price: "",
    location:"",
    desc: "",
    cover: "",
    images: [],
    vehiclemake: "",
    vehiclemodel: "",
    vehiclevarient:"",
    shortDesc: "",
    registeryear: "",
    registercity: "",
    transmission: "",
    mileage:"",
    fueltype:"",
    ownername: defaultfirstname && defaultlastname ? `${defaultfirstname} ${defaultlastname}` : "",
  });



  const { handleBlur, handleChange, errors, touched } =
  useFormik({
    initialValues,
    validationSchema: adFormSchema,
    validateOnChange: true,
    validateOnBlur: false,

  });

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(SingleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      setUploadClicked(true);
      setFormData((formData) => ({
        ...formData,
        cover,
        images,
      }));

  
    } catch (er) {
      console.log(er);
      setError('An error occurred during image upload');
    }
  };
  
 const handleCoverChanges = (e) => {
    const onesingleFile = e.target.files[0]; // Access the selected file using the files property
    if (!onesingleFile || onesingleFile.length <= 0) {
      setErrorMessageCover('Please select any cover image*');
    } else {
      setSingleFile(onesingleFile);
      setErrorMessageCover('');
    }
  };
  
  const handleImagesChange = (e) => {
    const selectedFiles = e.target.files;
  
    if (selectedFiles.length <= 0) {
      setErrorMessageImages('Please select vehicle images');
      setFiles([]);
      // Clear the images array when the input field is empty
      setFormData({
        ...formData,
        images: [],
      });
    } else if (selectedFiles.length > 8) {
      // Clear the selected files
      e.target.value = null;
      setFiles([]);
      // Set error message
      setErrorMessageImages('Maximum of 8 images can be selected');
    } else {
      setErrorMessageImages('');
      setFiles(selectedFiles);
      // Update the formData.images array when new images are selected
      const imageUrls = Array.from(selectedFiles).map((file) => URL.createObjectURL(file));
      console.log("imageUrls", imageUrls);
      setFormData({
        ...formData,
        images: imageUrls,
      });
    }
  };
  
  


  const handleSubmitValue = async (event) => {

    event.preventDefault();
    if (!uploadClicked) {
      console.log('Please upload images before submitting.');
      return;
    }
    // Get the form data from the event target (the form element)
    const form = event.target;
    const data = new FormData(form);

    // Extract the data from the FormData object and update the state
    setFormData({
      title: data.get('title'),
      contact: data.get('contact'),
      price: data.get('price'),
      location: data.get('location'),
      desc: data.get('desc'),
      cover: data.get('cover'),
      images: data.getAll('images'), // Use getAll to get all image values as an array
      vehiclemake: data.get('vehiclemake'),
      vehiclemodel: data.get('vehiclemodel'),
      vehiclevariant: data.get('vehiclevariant'),
      shortDesc: data.get('shortDesc'),
      registeryear: data.get('registeryear'),
      registercity: data.get('registercity'),
      transmission: data.get('transmission'),
      mileage: data.get('mileage'),
      fueltype: data.get('fueltype'),
      ownername: data.get('ownername')
    });
    
    try {

      await newRequest.post('/posts', formData);

      const message = "*Your Ad is posted*";
      const isConfirmed = window.confirm(message);
      if (isConfirmed) {
        navigate('/');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response.data);
      console.error('Error updating ad:', error);
    }
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
  
    
      setFormData({ ...formData, [name]: value });
     
    
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
    for(var i = 0; i < options.length; i++) {
      var option = options[i];
      var value = option.value.toLowerCase();
      if (value.indexOf(input) === 0 || input === "") {
        option.style.display = "block";
      } else {
        option.style.display = "none";
      }
    }
  };

  const imageInputsRef = useRef([]);

  const addImageInputRef = (ref) => {
    if (ref && !imageInputsRef.current.includes(ref)) {
      imageInputsRef.current.push(ref);
    }
  };

  const removeImage = (indexOrField) => {
   
    if (indexOrField === 'cover') {
      // Remove the cover image and clear the cover input field value
      setFormData({
        ...formData,
        cover: '',
      });
  
      // Reset the SingleFile state when the cover image is removed
      setSingleFile(null);
  
      const coverInput = coverInputRef.current;
      if (coverInput) {
        // Clear the cover input field value directly
        coverInput.value = '';
      }
    }
  };
  
  
  

  // Function to add cover image
  const addCover = (file) => {
    setFormData({ ...formData, cover: URL.createObjectURL(file) });
  };


  return (
    <div className='container pb-5'>
      <h1 className='text-center pt-5 pb-5' style={{ fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
       Post New Ad
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
<label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Fuel Type</label>
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
<label className="form-label" style={{ fontWeight: '600' }}>Vehicle Registeration Year</label>
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
<label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Make</label>
<select type="text" className="form-control" value={formData.vehiclemake} autoComplete="nope" id="vehiclemake" name="vehiclemake" placeholder="eg. Honda" 
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
      <label  className="form-label" style={{ fontWeight: '600' }}>Vehicle Mileage</label>
      <input name="mileage" type="number" value={formData.mileage} placeholder="km." className="form-control" id="mileage" required 
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
<input name="price" type="number" value={formData.price} placeholder="Rs." className="form-control" id="Price" required 
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
      <input name="contact" type="tel" value={formData.contact} className="form-control" placeholder='Phone no.' id="contact" required 
       onBlur={handleBlur}
       onChange={(e) => {handleChange && handleChange(e); handleChangeValue && handleChangeValue(e)}}
      />
    {touched.contact && errors.contact ? ( 
    <p className="form-error" style={{color:"red"}}>{errors.contact}</p>
    ) : null}
    </div>

    <div className="images d-flex col">
  <div className="images">
    <div className="imagesInputs">
      <label style={{ fontWeight: '600' }} className="form-label" htmlFor="">
        Cover Image
      </label>
      <input
        className="form-control"
        type="file"
        accept="image/png, image/gif, image/jpeg, image/jpg"
        name="cover"
        ref={coverInputRef}
        onChange={(e) => {
          handleCoverChanges(e);
          setSingleFile(e.target.files[0]);
          addCover(e.target.files[0])
        }}
        required
        
      />
      <div style={{ display: 'flex', gap: '10px', marginTop: '5px', marginBottom: '3%', position: 'relative' }}>
            {formData.cover && (
              <div style={{ position: 'relative' }}>
                <img
                  src={formData.cover}
                  alt="Cover"
                  style={{ width: '100px', height: '100px', objectFit: 'cover', display: 'block', margin: '5px' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    width: '25px',
                    height: '25px',
                    borderRadius: '50%',
                    backgroundColor: 'red',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => removeImage('cover')}
                >
                  X
                </div>
              </div>
            )}
          </div>
          {errorMessageCover && <p style={{ color: 'red', paddingBottom: '3px', paddingTop: '3px' }}>{errorMessageCover}</p>}

          <label style={{ fontWeight: '600' }} className="form-label" htmlFor="">
            Upload Images
          </label>
          <input
            className="form-control"
            type="file"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            name="images"
            ref={addImageInputRef}
            multiple
            onChange={(e) => {
              handleImagesChange(e);
              setFiles(e.target.files);
             // addImage(e.target.files); // Add this line to add new images
            }}
            
            
          />
          <div style={{ marginTop: '2%', marginBottom: '3%' }}>
            {formData.images.map((imageUrl, index) => (
              <div key={index} style={{ margin: 0, padding: 0, display: 'inline-block', position: 'relative' }}>
                <img
                  src={imageUrl}
                  alt="images"
                  style={{ width: '100px', height: '100px', objectFit: 'cover', display: 'block', margin: '5px' }}
                />
                
              </div>
            ))}
          </div>
          {errorMessageImages && <p style={{ color: 'red', paddingBottom: '3px', paddingTop: '3px' }}>{errorMessageImages}</p>}
        </div>
        <button
          type="button" // Add this attribute to prevent form submission
          className="btn btn-primary my-2"
          onClick={handleUpload}
          disabled={!SingleFile}
          
        >
          {uploading ? "Uploading" : "Upload Images"}
        </button>
      </div>
    </div>


</div>

    <div className="col-12 pb-5 pt-3">
    <button className="btn btn-primary" type="submit" disabled={!uploadClicked}>
            POST AD
          </button>
  </div>
  <label className='erros' style={{color:"red"}}>{error && error}</label> 
      </form>
    </div>
  );
};


