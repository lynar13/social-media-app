// src/js/api/profile.js

import { headers } from '../api/headers.js'; // Adjusted to a relative path
import { API_SOCIAL_PROFILES } from '../api/constants.js'; // Adjusted to a relative path
import { currentUser } from '../utilities/currentUser.js'; // Adjusted to a relative path

// Fetch profile data for the current user
export async function readProfile(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      method: 'GET',
      headers: headers(), // Use headers to include the API key and authorization token
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to load profile');
    }

    const { data } = await response.json();
    return data; // Return the profile data
  } catch (error) {
    console.error('Error reading profile:', error);
    throw error;
  }
}

// Update profile data for the current user
export async function updateProfile(username, data) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      method: 'PUT',
      headers: headers(true), // Use headers to include the API key and authorization token
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update profile');
    }

    const { data: updatedProfile } = await response.json();
    return updatedProfile; // Return the updated profile data
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}
