import { readPosts, createPost } from '/social-media-app/src/js/api/post.js';

document.addEventListener('DOMContentLoaded', () => {
  let currentPage = 1;
  const postsPerPage = 12;

  const postList = document.getElementById('postList');
  const pagination = document.getElementById('pagination');
  const searchInput = document.getElementById('searchInput');
  const sortOptions = document.getElementById('sortOptions');
  const createPostForm = document.getElementById('createPostForm');
  const postTitle = document.getElementById('postTitle');
  const postContent = document.getElementById('postContent');

  // Fetch and render posts
  async function loadPosts(page, searchTerm = '', sortOption = 'recent') {
    try {
      const posts = await readPosts(page, postsPerPage, searchTerm, sortOption);
      postList.innerHTML = ''; // Clear any existing content

      posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'col-md-6 mb-4';
        postCard.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${post.title || 'Untitled'}</h5>
              <p class="card-text">${post.body ? post.body.slice(0, 100) + '...' : 'No Content Available'}</p>
              <a href="/social-media-app/post/index.html?id=${post.id}" class="btn btn-primary">Read More</a>
            </div>
          </div>
        `;
        postList.appendChild(postCard);
      });

      renderPagination();
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  }

  // Handle search
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    loadPosts(1, searchTerm);
  });

  // Handle sort
  sortOptions.addEventListener('change', () => {
    const sortOption = sortOptions.value;
    loadPosts(1, searchInput.value, sortOption);
  });

  // Handle create new post
  createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPost = {
      title: postTitle.value,
      body: postContent.value,
    };

    try {
      await createPost(newPost);
      postTitle.value = '';
      postContent.value = '';
      loadPosts(1); // Reload posts after creating a new one
    } catch (error) {
      console.error('Failed to create a new post:', error);
    }
  });

  // Initial load
  loadPosts(currentPage);
});
