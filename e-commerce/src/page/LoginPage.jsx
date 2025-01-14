import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticat, login } from "../apiCalls/userApi";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password are required!");
    } else {
      setError("");
      // Handle login logic here
      login({ email, password })
        .then((response) => {
          if (response.error) {
            Swal.fire({
              title: "Error",
              html: response.error,
              icon: "warning",
              timerProgressBar: true,
              timer: 2000,
            });
          } else {
            Swal.fire({
              title: "Login Success",
              icon: "success",
              html: response.message,
              timerProgressBar: true,
              timer: 2000,
            }).then(() => {
              // Save JWT token
              authenticat(response)
              // Navigate to the profile page
              navigate("/profile");
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Unexpected Error",
            html: "Something went wrong. Please try again.",
            icon: "error",
            timerProgressBar: true,
            timer: 2000,
          });
          console.error("Login error:", error);
        });
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-gray-100 px-6 py-12 ">
      {/* Logo at the top center */}
      <div className="text-center mb-6">
        <img src="/logo1.png" alt="Pasa Logo" className="w-80 mx-auto" />
      </div>

      {/* Main container */}
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-5xl">
        {/* Left Image Section */}
        <div className="w-full md:w-[60%] p-0">
          <img
            src="/sign.png"
            alt="Login illustration"
            className="h-full w-full object-contain scale-105"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex flex-col justify-center w-full md:w-[45%] p-8">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Sign in to your account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberme"
                name="rememberme"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberme"
                className="ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>

            <div className="text-sm text-center">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
