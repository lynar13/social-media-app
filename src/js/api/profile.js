
import { headers } from '../api/headers.js'; // Adjusted to a relative path
import { API_SOCIAL_PROFILES, API_SOCIAL_PROFILES_POSTS } from '../api/constants.js'; // Adjusted to a relative path
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

// Fetch posts made by a specific user
export async function readUserPosts(username) {
  const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts`, {
    headers: headers(true),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Failed to fetch user posts');
  return result.data || []; // Ensure an array is returned
}

