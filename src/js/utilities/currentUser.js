// src/js/utilities/currentUser.js
export function currentUser() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      
      if (!user || !token) {
        console.error("No user or token found in localStorage");
        return null; // Return null if either user or token is missing
      }
      
      user.token = token; // Attach token to user object for convenience
      console.log("Current User:", user);
      return user;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  }
  