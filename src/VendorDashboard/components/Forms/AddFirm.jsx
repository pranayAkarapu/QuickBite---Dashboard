import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../Utilities/ApiPath';

const AddFirm = () => {
  const [firmName, setFirmname] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategory = (event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value))
    }else{
      setCategory([...category, value]);
    }
  }
  const handleRegion = (event)=>{
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=> item !== value))
    }else{
      setRegion([...region, value]);
    }
  }
  const handleImage = (event)=>{
    const image = event.target.files[0];
    setFile(image);
  }

  const handleFirm = async(e)=>{
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if(!loginToken){
        console.log("User not Authenticated");
      }
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append("offer", offer);
      category.forEach((value)=>{
        formData.append('category', value);
      });
      region.forEach((value)=>{
        formData.append('region', value);
      });
      formData.append('image', file);

      const response = await fetch(`${API_URL}/firm/add-Firm`, {
        method: 'POST',
        headers: {"token": `${loginToken}`},
        body : formData
      });
      const data = await response.json();
      if(response.ok){
        console.log(data);
        alert("Firm Added Successfully");
        setFirmname("");
        setArea("");
        setOffer("");
        setCategory([]);
        setRegion([]);
        setFile(null);
      }else if(data.message === "Vendor already has a firm"){
        alert("Firm Exists. Only one firm can be added");
      }else{
        alert("Failed to add Firm");
      }
      const firmId = data.firmIdresponse;
      localStorage.setItem("firmId", firmId);
    } catch (error) {
      console.error("Failed to add firm");
    }
  }

  return (
    <div className='firmsection' onSubmit={handleFirm}>
      <form className='tableform'>
        <label htmlFor="Name">Firm Name</label>
        <input type="text" id='Name' name='firmName' value={firmName} onChange={(e)=> setFirmname(e.target.value)} />
        <label htmlFor="Area">Area</label>
        <input type="text" id='Area' name='name' value={area} onChange={(e)=> setArea(e.target.value)} />
        <div className='category'>
            <label>Category</label>
            <div className='category-options'>
                <label><input type="checkbox"  id='Veg' value="Veg" checked={category.includes("Veg")} onChange={handleCategory} />Veg</label>
                <label><input type="checkbox" checked={category.includes("Non-Veg")} id='Non-Veg' value="Non-Veg" onChange={handleCategory} />Non-Veg</label>
            </div>
        </div>
        <div className='region'>
            <label>Region</label>
            <div className='region-options'>
                <label><input type="checkbox" id='south' value="South-Indian" checked={region.includes("South-Indian")} onChange={handleRegion}/>South-Indian</label>
                <label><input type="checkbox" id='north' value="North-Indian" checked={region.includes("North-Indian")} onChange={handleRegion}/>North-Indian</label>
                <label><input type="checkbox" id='chinese' value="Chinese" checked={region.includes("Chinese")} onChange={handleRegion}/>Chinese</label>
                <label><input type="checkbox" id='bakery' value="Bakery" checked={region.includes("Bakery")} onChange={handleRegion}/>Bakery</label>
            </div>
        </div>
        <label htmlFor="Offer">Offer</label>
        <input type="text" id='Offer' name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)} />
        <label htmlFor="Image">Firm Image</label>
        <input type="file" id='Image' onChange={handleImage} />
        <div className='btnsubmit'>
            <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddFirm
