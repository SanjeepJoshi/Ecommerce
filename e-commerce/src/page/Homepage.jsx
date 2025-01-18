import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

const Homepage = () => {
  const { items = [] } = useSelector((store) => store.itemStore);
  const dispatch = useDispatch();

  useEffect(() => {
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
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length > 0 ? (
          items.map((item) => <ProductCard key={item.id} item={item} />)
        ) : (
          <p className="text-center text-gray-600">Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
