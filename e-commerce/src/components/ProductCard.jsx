import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({item}) => {
  return (
    <div className="col">
    <div className="card">
      <img src={item.images?item.images[0]:''} className="card-img-top" alt="..."style={{height:'300px'}} />
      <div className="card-body">
        <h5 className="card-title text-truncate" title={item.title} >{item.title}</h5>
        {/* <p className="card-text">Description:{item.description}</p> */}
        <p className="card-text my-2">Price: ${item.price}</p>
        <p className="card-text my-2">Rating{item.rating}</p>
        <p className="card-text my-2">Stock{item.stock}</p>
        <Link to={`/product/${item.id}`} className='btn btn-warning w-100'>View Detail</Link>
      </div>
    </div>
    </div>
  )
}

export default ProductCard
