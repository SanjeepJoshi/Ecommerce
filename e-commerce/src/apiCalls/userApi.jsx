import { API } from "../config";

export const register = async (user) => {
    try {
      const response = await fetch(`http://localhost:3001/api/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }
  
      return data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Optional: to handle errors at the call site
    }
  };
  


//verifyuser
export const verifyUser = async (token) => {
    try {
        const response = await fetch(`${API}/api/verifyuser/${token}`);
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
 }

 //login
export const login = async (user) => {
    try {
        const response = await fetch(`${API}/api/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (error) {
        return console.log(error);
    }
}

//authenticated
export const authenticat = (info) => {
    localStorage.setItem('jwt', JSON.stringify(info))
}

export const isAuthenticated = () => {
   return localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : false
}

export const signout = () =>{
    localStorage.removeItem('jwt')
}


//fetching user data
export const getUserById = async (userId) => {
    try {
      const response = await fetch(`${API}/api/getuser/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data; // Return the parsed JSON data
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
      return { error: error.message }; // Return an error object
    }
  };
  

  //editProfile

  export const editProfile = async (userId, formData) => {
    try {
      const response = await fetch(`${API}/api/editprofile/${userId}`, {
        method: "POST", // Use PUT if following RESTful conventions
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error in editProfile:", error);
      throw error;
    }
  };
  
  