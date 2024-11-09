// src/js/ui/global/logout.js

export function onLogout() {
  try {
    // Remove user-related information from local storage
    localStorage.removeItem("token"); // Remove the stored token
    localStorage.removeItem("user");  // Remove the stored user information

    // Log a message for debugging purposes
    console.log("User has been logged out");

    // Redirect the user to the home page after a short delay
    setTimeout(() => {
      window.location.href = "/index.html"; // Change this to the correct home page URL
    }, 500); // Adding a slight delay to ensure storage operations complete before redirect
  } catch (error) {
    // Handle any unexpected errors during logout
    console.error("Error during logout:", error);
    alert("An error occurred while logging out. Please try again.");
  }
}

// Function to ensure the logout button is available before adding the event listener
function attachLogoutEvent() {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", onLogout);
    
  } else {
    console.error("Logout button not found in the DOM. Retrying...");

    // Retry after a short delay if the button isn't found yet (for dynamically loaded buttons)
    setTimeout(attachLogoutEvent, 500); // Retry after 500ms
  }
}

// Wait until the DOM is fully loaded before attaching the event listener
document.addEventListener("DOMContentLoaded", attachLogoutEvent);
