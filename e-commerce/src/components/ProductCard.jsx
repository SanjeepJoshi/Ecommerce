import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ item }) => {
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="w-full h-64 overflow-hidden rounded-lg">
        <img
          src={item.images ? item.images[0] : ''}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col mt-4">
        <h5
          className="text-lg font-medium text-gray-800 truncate"
          title={item.title}
        >
          {item.title}
        </h5>
        <p className="text-sm text-gray-600 my-1">Description:{item.description}</p>
        <p className="text-sm text-gray-600 my-1">Price: ${item.price}</p>
        <p className="text-sm text-gray-600 my-1">Rating: {item.rating}</p>
        <p className="text-sm text-gray-600 my-1">Stock: {item.stock}</p>
      </div>

      {/* Action Button */}
      <Link
        to={`/product/${item.id}`}
        className="mt-4 bg-yellow-500 text-white text-center py-2 rounded-lg hover:bg-yellow-600 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
