import { headers } from "./headers.js";
import { API_SOCIAL_POSTS, API_SOCIAL_POSTS_ID, API_SOCIAL_POSTS_SEARCH } from "./constants.js";
import { currentUser } from "../utilities/currentUser.js"; 


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

/* Get a paginated list of posts, search and sort posts */
export async function readPosts(page = 1, perPage = 12, searchTerm = '', sortOption = 'recent') {
  const params = new URLSearchParams({
    q: searchTerm,  // Search term for filtering posts
    _page: page,    // Pagination: current page
    _limit: perPage,  // Pagination: number of posts per page
    _sort: sortOption  // Sorting option (e.g., recent, title)
  });

  try {
    const url = `${API_SOCIAL_POSTS_SEARCH}?${params.toString()}`;  // Use the search endpoint
    const response = await fetch(url, {
      method: "GET",
      headers: headers(true),  // Include authentication if necessary
    });

    if (!response.ok) throw new Error("Failed to fetch posts");

    const result = await response.json();
    return result.data || result;  // Return the fetched posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts: " + error.message);
  }
}