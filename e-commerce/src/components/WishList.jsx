
import React, { useState, useEffect } from "react";
import axios from "axios";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]); // State for wishlist items
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null); // Error handling
  const [successMessage, setSuccessMessage] = useState(null); // Success message for adding to cart

  // Fetch wishlist items from backend
 

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-3xl border-collapse border mx-40 m-0 px-30 mt-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Wishlist</h2>

      {successMessage && (
        <p className="text-center text-green-500 mb-4">{successMessage}</p>
      )}
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && wishlist.length > 0 ? (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm border border-gray-300"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"/>
                <div>
                  <h3 className="font-medium text-gray-700">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.price}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        )
      )}
    </div>
  );
};

export default Wishlist;
