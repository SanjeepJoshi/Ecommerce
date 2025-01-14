import React, { useState } from "react";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });

    // Create a preview URL for the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product details submitted:", product);
    // Handle form submission logic
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-gray-100 px-6 py-12">
      {/* Logo at the top center */}
      <div className="text-center mb-6">
        <img src="/logo1.png" alt="Pasa Logo" className="w-80 mx-auto" />
      </div>

      {/* Main container */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-5xl">
        {/* Left Image Section */}
        <div className="w-full md:w-[50%] p-0 flex items-center justify-center bg-gray-50">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Product Preview"
              className="h-full w-auto max-h-[300px] object-contain"
            />
          ) : (
            <img
              src="/placeholder-image.png"
              alt="Placeholder"
              className="h-full w-auto max-h-[300px] object-contain"
            />
          )}
        </div>

        {/* Right Form Section */}
        <div className="flex flex-col justify-center w-full md:w-[50%] p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Add New Product
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={product.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product name"
              />
            </div>

            {/* Price in Rs */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price (Rs.)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product price in Rs."
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Living">Home & Living</option>
                <option value="Beauty & Health">Beauty & Health</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter product description"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Product Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
                className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-full shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
