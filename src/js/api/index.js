// src/js/api/index.js

import {
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
  API_SOCIAL_POSTS,
  API_SOCIAL_PROFILES,
  API_SOCIAL_PROFILES_NAME,
  API_SOCIAL_POSTS_TAG,

} from './constants.js'; // Import API URLs from constants.js
import { headers } from './headers.js'; // Import headers function from headers.js

export class NoroffAPI {

  constructor() {
    // Bind auth methods to the class instance
    this.auth.login = this.auth.login.bind(this);
    this.auth.register = this.auth.register.bind(this);
  }

  get user() {
    try {
      return JSON.parse(localStorage.user);
    } catch {
      return null;
    }
  }

  set user(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }

  get token() {
    return localStorage.token;
  }

  set token(accessToken) {
    localStorage.setItem('token', accessToken);
  }

  // Authentication methods
  auth = {
    login: async function({ email, password }) {
      const body = JSON.stringify({ email, password });

      const response = await fetch(API_AUTH_LOGIN, {
        method: "POST",
        headers: headers(true), // Use the headers function to set the API key
        body,
      });

      if (response.ok) {
        const { data } = await response.json();
        const { accessToken: token, ...user } = data;

        this.user = user;
        this.token = token;

        return { user, token};
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Couldn't login");
    }.bind(this),

    register: async function({ name, email, password }) {
      const body = JSON.stringify({ name, email, password });

      console.log("Request Body:", body); // Log request body
    
      const response = await fetch(API_AUTH_REGISTER, {
        method: "POST",
        headers: headers(true), // Ensure headers include Content-Type: application/json
        body,
      });
    
      console.log("Response Status:", response.status); // Log response status
      if (response.ok) {
        const { data } = await response.json();
        const { accessToken: token, ...user } = data;
        localStorage.token = token;
        localStorage.user = JSON.stringify(user);
        return { user, token };  // Return the correctly formatted data
      }
    
      // Capture and log the error message returned by the server
      const errorData = await response.json();
      console.log("Registration Error", errorData); // Log server error message
      throw new Error(errorData.message || "Couldn't register");
    }.bind(this), // Ensure register function is bound to the class instance
    
  };


  // Post-related methods
  post = {
    create: async function({ title, body, tags, media }) {
      const request = {
        url: API_SOCIAL_POSTS, // Use constant for posts URL
        method: "POST",
        headers: headers(true), // Use headers with API key
        body: JSON.stringify({ title, body, tags, media }),
      };

      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't create post");
    }.bind(this),

    read: async function(id) {
      const request = {
        url: `${API_SOCIAL_POSTS}/${id}`, // Use constant for individual post URL
        method: "GET",
        headers: headers(), // Use headers with API key
      };

      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't read post");
    },

    update: async function(id, { title, body, tags, media }) {
      const request = {
        url: `${API_SOCIAL_POSTS}/${id}`, // Use constant for individual post URL
        method: "PUT",
        headers: headers(), // Use headers with API key
        body: JSON.stringify({ title, body, tags, media }),
      };

      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't update post");
    },

    delete: async function(id) {
      const request = {
        url: `${API_SOCIAL_POSTS}/${id}`, // Use constant for individual post URL
        method: "DELETE",
        headers: headers(), // Use headers with API key
      };

      const response = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
      });

      if (response.ok) {
        return true;
      }

      throw new Error("Couldn't delete post");
    }
  };

  // Multiple posts handling
  posts = {
    read: async (page = 1, limit = 12, tag) => {
      const url = new URL(API_SOCIAL_POSTS);
      const params = new URLSearchParams({ page, limit });

      if (tag) params.append("tag", tag);
      url.search = params.toString();

      const response = await fetch(url, {
        headers: headers(),
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't read posts");
    },
    
    create: async ({ title, body, tags, media }) => {
      const response = await fetch(API_SOCIAL_POSTS, {
        method: "POST",
        headers: headers(true),
        body: JSON.stringify({ title, body, tags, media }),
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't create post");
    }
  };
       
  // User profiles handling
  profiles = {
    read: async (username) => {
      const url = new URL(`${API_SOCIAL_PROFILES}/${username}`);

      const response = await fetch(url, {
        headers: headers(), // Use headers with API key
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't read user profile");
    }
  };

  // User profile name handling
  profilesName = {
    read: async (username) => {
      const url = new URL(`${API_SOCIAL_PROFILES_NAME}/${username}`);

      const response = await fetch(url, {
        headers: headers(), // Use headers with API key
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't read user profile name");
    }
  };

  // Post-related methods for a specific tag
  postsTag = {
    read: async (tag, page = 1, limit = 12) => {
      const url = new URL(`${API_SOCIAL_POSTS_TAG}?tag=${tag}`);

      url.searchParams.append("page", page);
      url.searchParams.append("limit", limit);

      const response = await fetch(url, {
        headers: headers(), // Use headers with API key
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't read posts with tag");
    }
  };

  // Search functionality
  search = {
    posts: async (query) => {
      const url = new URL(`${API_SOCIAL_POSTS}?search=${query}`);

      const response = await fetch(url, {
        headers: headers(), // Use headers with API key
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't search posts");
    }
  };

  // Tag handling
  tags = {
    read: async () => {
      const response = await fetch(API_SOCIAL_POSTS_TAG, {
        headers: headers(), // Use headers with API key
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      }

      throw new Error("Couldn't read tags");
    }
  };
}
