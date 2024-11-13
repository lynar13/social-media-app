import { headers } from "./headers.js";
import { API_SOCIAL_POSTS, API_SOCIAL_POSTS_ID } from "./constants.js";
import { currentUser } from "../utilities/currentUser.js"; // Adjust relative path as needed

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
export async function readPost(id) {
  const url = API_SOCIAL_POSTS_ID(id);
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers(true),
    });
    
    if (!response.ok) throw new Error("Failed to fetch post");
    
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

/* Update a post by ID */
export async function updatePost(id, data) {
  try {
    const response = await fetch(API_SOCIAL_POSTS_ID(id), {
      method: "PUT",
      headers: headers(true, true), // Include Content-Type and Authorization
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update post");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post: " + error.message);
  }
}

/* Delete a post by ID */
export async function deletePost(id) {
  try {
    const response = await fetch(API_SOCIAL_POSTS_ID(id), {
      method: "DELETE",
      headers: headers(true),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) return {}; 

    return JSON.parse(text);
  } catch (error) {
    console.error('Error during post deletion:', error);
    throw new Error("Failed to delete post: " + error.message);
  }
}

/* Get a paginated list of posts, optionally filtered by tag */
export async function readPosts(page = 1, perPage = 12, tag = null) {
  const params = new URLSearchParams({
    page,
    perPage,
  });

  if (tag) params.append('tag', tag);

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}?${params.toString()}`, {
      method: "GET",
      headers: headers(true),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Failed to fetch posts");

    return result.data || result;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts: " + error.message);
  }
}
