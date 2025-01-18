import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../apiCalls/userApi";
import Swal from "sweetalert2";
import { API } from "../config";

const Header = () => {
  const navigate = useNavigate();
  const [userPopup, setUserPopup] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // To handle mobile menu toggle
  const popupRef = useRef(null); // Reference to detect click outside

  let { user } = isAuthenticated();

  const handleDropdownCategory = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const handleDropdownProduct = () => {
    setShowProductDropdown(!showProductDropdown);
  };

  // Close popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setUserPopup(false); // Close the popup if the click is outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    signout();
    Swal.fire("Logged out successfully").then(() => {
      navigate('/login');
    });
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section: Logo and Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img className="h-8" src="/logo1.png" alt="Logo" />
            </div>
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
              >
                Home
              </Link>
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={handleDropdownCategory}
                  onMouseLeave={() => setShowCategoryDropdown(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 text-center"
                >
                  Category <i className="fa fa-chevron-down ms-1"></i>
                </button>
                {showCategoryDropdown &&(
                  <div className="absolute left-0 w-32 bg-gray-800 shadow-md rounded-md mt-2">
                    {/* Example dropdown items */}
                    <Link to="/category/1" className="block px-4 py-2 text-sm text-white">Category 1</Link>
                    <Link to="/category/2" className="block px-4 py-2 text-sm text-white">Category 2</Link>
                    <Link to="/category/3" className="block px-4 py-2 text-sm text-white">Category 3</Link>
                  </div>
                )}
              </div>
            
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onMouseEnter={handleDropdownProduct}
                  onMouseLeave={() => setShowProductDropdown(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Products  <i className="fa fa-chevron-down ms-1"></i>
                </button>
                {showProductDropdown && (
                  <div className="absolute left-0 w-32 bg-gray-800 shadow-md rounded-md mt-2 text-center">
                    {/* Example dropdown items */}
                    <Link to="/products/1" className="block px-4 py-2 text-sm text-white">Product 1</Link>
                    <Link to="/products/2" className="block px-4 py-2 text-sm text-white">Product 2</Link>
                    <Link to="/products/3" className="block px-4 py-2 text-sm text-white">Product 3</Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section: Search Bar, Notifications, and Profile */}
          <div className="flex items-center space-x-6">
            {/* Mobile Hamburger Icon */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className="fa fa-bars text-2xl"></i>
            </button>

            {/* Search Bar */}
            <div className="relative text-gray-400 focus-within:text-white">
              <i className="fa fa-search absolute top-3 left-4"></i>
              <input
                type="text"
                placeholder="Search"
                className="block w-full bg-gray-800 rounded-full pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-700"
              />
            </div>

            {/* Notification and Cart Icons (only visible on md screens and above) */}
            <div className="hidden md:flex space-x-4">
              <button className="text-gray-400 hover:text-white">
                {/* <i className="fa fa-bell text-2xl"></i> */}
              </button>
              <button className="text-gray-400 hover:text-white">
                <Link to="/cart">
                <i className="fa fa-shopping-cart text-2xl"></i>
                </Link>
              </button>
            </div>

            {user ? (
              <div className="relative flex">
                <img
                  className="h-8 w-8 ms-8 rounded-full cursor-pointer"
                  src={`${API}/profileImages/${user.profileImage}`}
                  alt="User"
                  onClick={() => { setUserPopup(!userPopup); }}
                />
                {userPopup && (
                  <div ref={popupRef} className="absolute top-14 right-0 bg-gray-900 p-4 shadow-md rounded flex flex-col items-center cursor-pointer">
                    <img
                      src={`${API}/profileImages/${user.profileImage}`}
                      alt=""
                      className="h-12 rounded-full"
                      title="View profile"
                      onClick={() => { navigate('/profile'); }}
                    />
                    <h2 className="text-lg font-bold mb-2">{user.username}</h2>
                    <p className="text-gray-600 mb-4">{user.email}</p>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-full rounded-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-full text-sm font-medium hover:bg-gray-700 bg-pink-400"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu (if isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
          >
            Home
          </Link>
          <div className="relative">
            <button
              onClick={handleDropdownCategory}
              className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
            >
              Category <i className="fa fa-chevron-down ms-1"></i>
            </button>
            {showCategoryDropdown && (
              <div className="absolute left-0 w-32 bg-gray-800 shadow-md rounded-md mt-2">
                <Link to="/category/1" className="block px-4 py-2 text-sm text-white">Category 1</Link>
                <Link to="/category/2" className="block px-4 py-2 text-sm text-white">Category 2</Link>
                <Link to="/category/3" className="block px-4 py-2 text-sm text-white">Category 3</Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={handleDropdownProduct}
              className="block px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"
            >
              Products  <i className="fa fa-chevron-down ms-1"></i>
            </button>
            {showProductDropdown && (
              <div className="absolute left-0 w-32 bg-gray-800 shadow-md rounded-md mt-2 text-center">
                <Link to="/products/1" className="block px-4 py-2 text-sm text-white">Product 1</Link>
                <Link to="/products/2" className="block px-4 py-2 text-sm text-white">Product 2</Link>
                <Link to="/products/3" className="block px-4 py-2 text-sm text-white">Product 3</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
