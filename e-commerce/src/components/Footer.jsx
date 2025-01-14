import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <img src="/logo1.png" alt="E-commerce Logo" className="h-12 mb-4" />
            <p className="text-sm">
              Your trusted marketplace for a wide range of products, delivering
              quality and convenience at your doorstep.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" aria-label="GitHub">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Men's Fashion</a>
              </li>
              <li>
                <a href="#">Women's Fashion</a>
              </li>
              <li>
                <a href="#">Electronics</a>
              </li>
              <li>
                <a href="#">Home & Garden</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Shipping Info</a>
              </li>
              <li>
                <a href="#">Returns Policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Your E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
