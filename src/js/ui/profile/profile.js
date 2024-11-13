import { readProfile } from '/social-media-app/src/js/api/profile.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Retrieve the user string from localStorage
  const userString = localStorage.getItem('user');

  // If the user string is not present, redirect to login
  if (!userString) {
    alert('User not found. Please login again.');
    window.location.href = '/social-media-app/auth/login/index.html'; // Updated path
    return;
  }

  let user;
  try {
    // Try parsing the user string into an object
    user = JSON.parse(userString);

    // Check if the parsed user object is valid
    if (!user || typeof user !== 'object' || !user.name) {
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);

    // Clear invalid user data and redirect to login
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove the token as well if needed
    alert('Invalid user data found. Redirecting to login.');
    window.location.href = '/social-media-app/auth/login/index.html'; // Updated path
    return;
  }

  // Use the parsed user data to read profile
  try {
    const profile = await readProfile(user.name); // Assuming readProfile accepts a username
    document.getElementById('username').textContent = profile.name;
    document.getElementById('email').textContent = profile.email;
  } catch (error) {
    console.error('Failed to load profile:', error);
    alert('Failed to load profile. Please try again later.');
  }
});
