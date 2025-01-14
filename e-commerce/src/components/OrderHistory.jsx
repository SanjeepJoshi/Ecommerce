
import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // State to store order history
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch orders from the backend API
  

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-3xl border-collapse border mx-40 m-0 px-30 mt-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Table */}
      {!loading && !error && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Order ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-right text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Orders Message */}
      {!loading && !error && orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
