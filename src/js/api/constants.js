// src/js/api/constants.js
// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
export const API_KEY = "c587b262-2244-4cb8-b2f1-bb31b6808b52";

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_POSTS_ID = (id) => `${API_SOCIAL}/posts/${id}`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

export const API_SOCIAL_PROFILES_NAME = `${API_SOCIAL}/profiles/<name>`;

export const API_SOCIAL_POSTS_TAG = (tag) => `${API_SOCIAL_POSTS}?tag=${tag}`;

export const API_SOCIAL_PROFILES_POSTS = (name) => `${API_SOCIAL}/profiles/${name}/posts`;

export const API_SOCIAL_POSTS_SEARCH = `${API_SOCIAL_POSTS}/search`;


