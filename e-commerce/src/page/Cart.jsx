import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const { cart_items } = useSelector((store) => store.cartStore);
  const dispatch = useDispatch();

  const removeFromCart = (id) => (e) => {
    e.preventDefault();
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="p-4">
      <h3 className="text-center underline my-4 text-lg font-bold">Cart Items</h3>
      {cart_items.length > 0 ? (
        <>
          <table className="table-auto w-3/4 mx-auto border-collapse border border-gray-300 text-center bg-red-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">S.No</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Product</th>
                <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Total Price</th>
                <th className="border border-gray-300 px-4 py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart_items.map((item, i) => (
                <tr key={item.cart_id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 mx-auto object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.price}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">${item.price * item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={removeFromCart(item.cart_id)}
                    >
                      Remove <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center my-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2"
              onClick={() => {
                dispatch({ type: "EMPTY_CART" });
              }}
            >
              Empty Cart
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              <a href="/" className="text-white no-underline">
                Check Out
              </a>
            </button>
          </div>
        </>
      ) : (
        <div className="text-center my-5 text-gray-700">No items in the cart</div>
      )}
    </div>
  );
};

export default Cart;
