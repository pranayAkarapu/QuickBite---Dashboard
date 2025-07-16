import React, {useState, useEffect} from 'react'
import { API_URL } from '../Utilities/ApiPath';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const handleProducts = async()=>{
        const firmId = localStorage.getItem("firmId");
        if(!firmId){
            setProducts([]);
            return
        }
        try{
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const data = await response.json();
            setProducts(data.products);
            console.log(data);
        }catch(error){
            console.error("Failed to fetch Products", error);
            alert("Failed to fetch products")
        }
    }
    useEffect(()=>{
        handleProducts();
    },[]);

    const deleteProduct = async(productId)=>{
        try {
            const response = await fetch(`${API_URL}/product/delete/${productId}`,{
                method: 'DELETE',
            });
            if(response.ok){
                setProducts(products.filter(product=> product._id !== productId));
                confirm("Are you sure, you want to delete product")
                alert("Product deleted Successfully");
            }
        } catch (error) {
            console.error("Failed to delete Product");
            alert("Failed to delete product");
        }
    }

    const firmId = localStorage.getItem("firmId");
    if (!firmId) {
        return <p>Please log in to view products.</p>;
    } 
  return (
    <div>
      {
        products.length === 0? <p>No Products Added</p> : (
            <table className='product-table'>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((item)=>{
                            return(
                                <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        {item.image && 
                                            <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName}/>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )}
    </div>
  )
}

export default AllProducts
