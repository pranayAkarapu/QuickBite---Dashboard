import React, { use } from 'react'
import { useState } from 'react'
import { API_URL } from '../../Utilities/ApiPath';

const AddProduct = () => {
  const [productName, setproductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestseller, setbestseller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setdescription] = useState("");

  const handleCategory = (event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value))
    }else{
      setCategory([...category, value]);
    }
  }

  const handleBestseller = (event)=>{
    const value = event.target.value === "true"
    setbestseller(value);
  }

  const handleImage = (event)=>{
    const image = event.target.files[0];
    setImage(image);
  }

  const handleAddProduct = async(e)=>{
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      const firmId = localStorage.getItem("firmId");
      if(!loginToken || !firmId){
        alert("Please login first");
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("bestseller", bestseller);
      category.forEach((value)=>{
        formData.append('category', value);
      });

      const response = await fetch(`${API_URL}/product/addProduct/${firmId}`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if(response.ok){
        alert("Product added successfully");
        setproductName("");
        setPrice("");
        setdescription("");
        setbestseller(false);
        setCategory([]);
        setImage(null);
      }

    } catch (error) {
      console.error(error);
      alert("Failed to Add Product");
    }
  }
  

  return (
    <div className='productsection'>
      <form className='tableform' onSubmit={handleAddProduct}>
        <label htmlFor="Name">Product Name</label>
        <input type="text" id='Name' value={productName} onChange={(e)=> setproductName(e.target.value)} />
        <label htmlFor="Price">Price</label>
        <input type="number" id='Price' value={price} onChange={(e)=>setPrice(e.target.value)} />
        <div className='category'>
            <label>Category</label>
            <div className='category-options'>
                <label htmlFor='Veg'><input type="checkbox" id='Veg' value="Veg" checked={category.includes("Veg")} onChange={handleCategory} />Veg</label>
                <label htmlFor='Non-Veg'><input type="checkbox" id='Non-Veg' checked={category.includes("Non-Veg")} value="Non-Veg" onChange={handleCategory} />Non-Veg</label>
            </div>
        </div>
        <div className='bestseller'>
          <label>BestSeller</label>
          <div className='bestseller-options'>
            <label htmlFor='Yes'><input type="radio" id='Yes' value="true" checked={bestseller===true} onChange={handleBestseller} />Yes</label>
            <label htmlFor='No'><input type="radio" id='No' values="false" checked={bestseller===false} onChange={handleBestseller} />No</label>
          </div>
        </div>
        <label htmlFor="Description">Description</label>
        <textarea name="Description" id="Description" value={description} onChange={(e)=> setdescription(e.target.value)}></textarea>
        <label htmlFor="Image">Product Image</label>
        <input type="file" id='Image' onChange={handleImage} />
        <div className='btnsubmit'>
            <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
