import {React, useRef, useState} from 'react';
import AdCard from '../../components/Adcard';
import { BsFilter  } from 'react-icons/bs';
import { useQuery} from "react-query";
import newRequest from "../../utils/newRequest";


const Ads = () => {
   const [input, setInput] = useState("");

  const minRef = useRef();
  const maxRef = useRef();
  const cityRef = useRef();
  const vehicleMakeRef = useRef();
  const vehicleModelRef = useRef();


  const { isLoading: coverLoading,  data: coverData } = useQuery(
    ['displaycover'],
    () =>
      newRequest.get('/cover/appliedcover').then((res) => {
        return res.data;
      }),
    {
      retry: false, // Prevent automatic retries on failure

    }
    
  );



  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["ads"],
    queryFn: () =>
      newRequest.get(`/posts?search=${input}&min=${minRef.current.value}&max=${maxRef.current.value}&vehiclemake=${vehicleMakeRef.current.value}&location=${cityRef.current.value}&vehiclemodel=${vehicleModelRef.current.value}`).then((res) => {
      return res.data;
        }),
        
  });

  const handleSubmit = () => {
    minRef.current.value = '' || null ;
    maxRef.current.value = '' || null;
    cityRef.current.value = '';
    vehicleMakeRef.current.value = '';
    vehicleModelRef.current.value = '';
    refetch();
  };

  const clear = () => {
    minRef.current.value = '' || null ;
    maxRef.current.value = '' || null;
    cityRef.current.value = '';
    vehicleMakeRef.current.value = '';
    vehicleModelRef.current.value = '';

    refetch();
  };

  const apply = () => {
    refetch();
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
  };

  return ( <>
 <div className='d-flex justify-content-center'>
    {coverLoading ? (
      null
    )  : coverData ? (
      <img
        src={coverData} // Use the URL from the API response
        alt="cover"
        style={{
          width: '100%',
          maxHeight: '400px',
          objectFit: 'cover',
          margin: '0 auto'
        }}
      />
    ) : null}
  </div>
    

    <div className="container pt-3 pb-3">
    <div className="row">
        <div className="col-lg-6 mx-auto">
            <div className="input-group">
                <input style={{borderRadius: '8px',}} type="text" className="form-control" placeholder="Search for ad" onChange={(e) => setInput(e.target.value)} />
                <span className="input-group-btn px-2 " style={{marginTop:'4px'}}>
                <button
                style={{
                  backgroundColor: '#ffffff',
                  color: 'black',
                  border: 'none',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow : '0 0 10px rgba(0, 0, 0, 0.05)'

                }}
                
                onClick={handleSubmit}
              >   Search
              </button> 
              <button className='btn'
       data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"    style={{
      backgroundColor: '#ffffff',
      color: 'black',
      border: 'none',
      padding: '0.15rem 0.35rem', // reduce padding to make button smaller
      marginTop:'-4px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
      marginLeft: '10px', // add left margin to the filter icon button
      textAlign:'center'
    }}
  >
    Filter
    <BsFilter/>
</button>
 

  </span>
     <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel" style={{
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}>Apply Filter on Ads</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    
      <label className="form-label" htmlFor="city" style={{ fontWeight: "600" }}>
        City
      </label>
      <select
        name="location"
        ref={cityRef}
        placeholder="Post place"
        className="form-control city-select"
        id="city-list"
        onKeyUp={filterCities}
        style={{
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
        
      > 
        <option value="" style={{fontWeight:"500"}}>Select City </option>
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
    


    
<label  className="form-label" style={{ fontWeight: '600', marginTop: '5%', marginBottom:"0px" }}>Vehicle Make</label>
<select type="text" className="form-control" autoComplete="nope" id="vehiclemake" name="vehiclemake" placeholder="eg. Honda" 
ref={vehicleMakeRef}
style={{
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
}}

 >
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

      
<label  className="form-label" style={{ fontWeight: '600', marginTop: '5%', marginBottom:"0px" }}>Vehicle Model</label>
<select type="number" className="form-control" autoComplete="nope" placeholder="eg. 2023"  name="vehiclemodel" id="vehiclemodel" ref={vehicleModelRef}
  style={{
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  }}
  >
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
             


    <div className="menu" style={{marginTop: '5%'}}>
  <div className="left" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <label className="form-label" htmlFor="budget" style={{ fontWeight: "600", marginBottom:"0px" }}>
        Budget
      </label>
    <input ref={minRef} type="number" placeholder="Min" 
           style={{
             padding: '10px',
             border: 'none',
             borderRadius: '5px',
             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
           }}/>
    <input ref={maxRef} type="number" placeholder="Max" 
           style={{
             padding: '10px',
             border: 'none',
             borderRadius: '5px',
             boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
           }}/>
    <button style={{
              backgroundColor: '#a891b7',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#a891b7';
              e.target.style.color = 'black';
              e.target.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#a891b7';
              e.target.style.color = 'white';
              e.target.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}
            onClick={apply}
    >Apply</button>

<button style={{
              backgroundColor: '#a891b7',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#a891b7';
              e.target.style.color = 'black';
              e.target.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#a891b7';
              e.target.style.color = 'white';
              e.target.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }}
            onClick={clear}
    >Clear Filter</button>
  </div>
</div>

</div>
            </div>
        </div>
    </div>

    
</div>

</div>


    {/* // ****************************************************************************************************** */}
    <div>

<div className="text-center">
  <label className="h4 text-right fw-bold m-3 mt-5 mb-0">
    Recent Posts
  </label>
</div>

          <div className="Ads">
      <div className="container">
        
       
        <div className="cards">

        {isLoading ? (
        <div className="loading-message" style={{display:"flex", justifyContent: "center", alignItems: "center", fontSize: "24px", fontWeight: "bold", marginTop: "10%", marginBottom: "10%" }}>Loading...</div>
        ) : error ? (
        <div className="error-message" style={{ display:"flex", justifyContent: "center", alignItems: "center", fontSize: "24px", fontWeight: "bold", color: "red", marginTop: "10%", marginBottom: "10%"  }}>Something went wrong!</div>
        ) : (
         data.map((ad) => <AdCard key={ad._id} item={ad} />)
       )}
       
        </div>
      </div>
    </div>
    <div/>
    </div>
    </> )
}

export default Ads
