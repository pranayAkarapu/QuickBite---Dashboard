import React from 'react'

const SideBar = ({firmHandler, productHandler, allproducts, firmtitle}) => {
  return (
    <div className="sidebarsection">
        <ul>
            {firmtitle?<li onClick={firmHandler}>Add Firm</li>:"" }
            <li onClick={productHandler}>Add Product</li>
            <li onClick={allproducts}>All Products</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default SideBar
