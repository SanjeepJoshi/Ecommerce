import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);

  const { cart_items } = useSelector((store) => store.cartStore);
  const { isLoggedIn } = useSelector((store) => store.authStore); // Check login status from authStore

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((result) => setProduct(result));
  }, [id]);

  const addToCart = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      Swal.fire(
        'Login Required!',
        'Please log in to add products to the cart.',
        'warning'
      );
      return;
    }

    if (quantity === 0) {
      Swal.fire(
        'Attention!',
        '0 Quantity cannot be added to the cart',
        'warning'
      );
    } else {
      let cart_item = {};
      let itemExists = cart_items.find((item) => item.product === product.id);

      if (itemExists) {
        Swal.fire({
          title: 'Attention!',
          text: 'This item is already in the cart. Do you want to add more?',
          icon: 'warning',
          showCancelButton: true,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            cart_item = {
              ...itemExists,
              quantity: Number(itemExists.quantity) + Number(quantity),
            };
            dispatch({ type: 'UPDATE_CART', payload: cart_item });
            Swal.fire('Success!', 'Item added to the cart.', 'success');
          }
        });
      } else {
        cart_item = {
          cart_id: Math.trunc(Math.random() * 10000 + Date.now()),
          title: product.title,
          image: product.images[0],
          price: product.price,
          product: product.id,
          stock: product.stock,
          quantity,
        };
        dispatch({ type: 'ADD_TO_CART', payload: cart_item });
        Swal.fire('Congrats!', 'Your item has been added to the cart.', 'success');
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl">
          {/* Product Image */}
          <div className="flex justify-center mb-6">
            <img
              src={product.images && product.images[0]}
              alt="productImage"
              className="w-72 h-72 object-cover rounded-md"
            />
          </div>

          {/* Product Details */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">{product.title}</h3>
            <h3 className="text-xl font-medium text-gray-700">${product.price}</h3>
            <h3 className="text-gray-600">Description: {product.description}</h3>
            <h3 className="text-gray-600">Rating: {product.rating}</h3>
            <h3 className="text-gray-600">Brand: {product.brand}</h3>
            <h3 className="text-gray-600">Category: {product.category}</h3>
            <h3 className="text-gray-600">Stock: {product.stock}</h3>
            <h4 className="text-gray-600">
              Quantity:{' '}
              <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                max={product.stock}
                min={1}
                className="border border-gray-300 rounded-md p-1 w-20 text-center"
              />
            </h4>
            <h3 className="text-gray-600">Discount: {product.discountPercentage}%</h3>

            {/* Add to Cart Button */}
            <button
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
