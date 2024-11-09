import { headers } from "/src/js/api/headers.js";
import { API_SOCIAL_POSTS } from "/src/js/api/constants.js";
import { API_SOCIAL_POSTS_ID } from "/src/js/api/constants.js";
import { currentUser } from "/src/js/utilities/currentUser.js";

/* Create new post */
export async function createPost(data) {
  const user = currentUser();


  /* Check if user is logged in and token is available */
  if (!user || !localStorage.getItem('token')) {
    console.error("User is not logged in or token is missing");
    window.location.href = "/auth/login/index.html"; // Redirect to login page
    return;
  }

  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: headers(true, true), 
      body: JSON.stringify(data),
    });
    
    /* Log response for debugging */
    console.log('Create Post Response:', response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Post creation failed');
    }

    const result = await response.json();
    return result.data; 
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post: ' + error.message);
  }
}

/* Get a specific post by ID */
/* Use the correct endpoint */
export async function readPost(id) {
  const url = API_SOCIAL_POSTS_ID(id); 
  console.log('Fetching post from URL:', url);
  const response = await fetch(url, {
    method: "GET",
    headers: headers(true),
  });
  if (!response.ok) throw new Error("Failed to fetch post");
  return await response.json();
}

/* Update a post by ID */
export async function updatePost(id, data) {
  const response = await fetch(API_SOCIAL_POSTS_ID(id), {
    method: "PUT",
    headers: headers(true), // Include Content-Type and Authorization
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update post");
  return await response.json();
}

/* Delete a post by ID */
export async function deletePost(id) {
  try {
    const response = await fetch(API_SOCIAL_POSTS_ID(id), {
      method: "DELETE",
      headers: headers(true), // Include Content-Type and Authorization
    });


    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status} ${response.statusText}`);
    }

    /* Handle cases where the server might return an empty response */
    const text = await response.text(); // Read the response as text first
    if (!text) {
      return {}; 
    }

    /* If the response contains text, parse it as JSON */
    const result = JSON.parse(text);

    return result;
  } catch (error) {
    console.error('Error during post deletion:', error);
    throw error;
  }
}

/* Get a paginated list of posts, optionally filtered by tag */
export async function readPosts(page = 1, perPage = 12, tag = null) {
  const params = new URLSearchParams({
    page,
    perPage,
  });

  if (tag) params.append('tag', tag);

  const response = await fetch(`${API_SOCIAL_POSTS}?${params.toString()}`, {
    method: "GET",
    headers: headers(true),
  });

  /* Log the response to inspect its structure */
  const result = await response.json();

  if (!response.ok) throw new Error("Failed to fetch posts");

  /* Return result.data if it exists, otherwise return the whole result */
  return result.data || result;
}

