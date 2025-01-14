import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

const Homepage = () => {
  // Safeguard against undefined or null items
  const { items = [] } = useSelector((store) => store.itemStore);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch products if the items array is empty
    if (items.length === 0) {
      fetch('https://dummyjson.com/products')
        .then((response) => response.json())
        .then((result) =>
          dispatch({
            type: 'LOAD_PRODUCTS',
            payload: result.products,
          })
        )
        .catch((error) => console.error('Error fetching products:', error));
    }
  }, [items.length, dispatch]);

  return (
    <div className="container mx-auto">
      <div className="bg-slate-500 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 my-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="bg-white p-4 shadow rounded">
                <ProductCard item={item} />
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Homepage;
