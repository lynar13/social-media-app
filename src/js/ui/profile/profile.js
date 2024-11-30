import { readProfile, readUserPosts } from '/src/js/api/profile.js';

document.addEventListener('DOMContentLoaded', async () => {
  const userString = localStorage.getItem('user');

  // Check for user data in localStorage
  if (!userString) {
    alert('User not found. Please login again.');
    window.location.href = '/auth/login/index.html';
    return;
  }

  let user;
  try {
    user = JSON.parse(userString);
    if (!user || typeof user !== 'object' || !user.name) {
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    alert('Invalid user data. Redirecting to login.');
    window.location.href = '/auth/login/index.html';
    return;
  }

  // Load and display profile details
  try {
    const profile = await readProfile(user.name);
    document.getElementById('username').textContent = profile.name;
    document.getElementById('profileImage').src = profile.profileImage || '/images/profile.jpeg';
    document.getElementById('followersCount').textContent = profile.followers || 0;
    document.getElementById('followingCount').textContent = profile.following || 0;

    const followButton = document.getElementById('followButton');
    followButton.textContent = profile.isFollowing ? 'Unfollow' : 'Follow';
    followButton.addEventListener('click', () => {
      // Logic for follow/unfollow
    });
  } catch (error) {
    console.error('Failed to load profile:', error);
    alert('Failed to load profile. Please try again later.');
  }

  // Fetch and display user posts
  try {
    const posts = await readUserPosts(user.name);
    const userPosts = document.getElementById('userPosts');
    userPosts.innerHTML = ''; // Clear any existing posts

    if (posts.length === 0) {
      userPosts.innerHTML = '<p>No posts to display.</p>';
    } else {
      posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'col-md-6 mb-4';
        postCard.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${post.title || 'Untitled'}</h5>
              <p class="card-text">${post.body ? post.body.slice(0, 100) + '...' : 'No content available'}</p>
              <a href="/social-media-app/post/index.html?id=${post.id}" class="btn btn-primary">Read More</a>
            </div>
          </div>
        `;
        userPosts.appendChild(postCard);
      });
    }
  } catch (error) {
    console.error('Failed to load user posts:', error);
    alert('Failed to load user posts. Please try again later.');
  }
});
