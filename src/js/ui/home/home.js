// src/js/ui/home/home.js

import { readPosts } from '../../api/post.js';

document.addEventListener('DOMContentLoaded', () => {
  let currentPage = 1;
  const postsPerPage = 12;

  const postList = document.getElementById('postList');
  const pagination = document.getElementById('pagination');
  const logoutButton = document.getElementById('logoutButton');

  // Check login status and hide logout button if not logged in
  function toggleLogoutButton() {
    const isLoggedIn = localStorage.getItem('token'); // Check for token in localStorage

    if (isLoggedIn) {
      logoutButton.style.display = 'block'; // Show if logged in
    } else {
      logoutButton.style.display = 'none'; // Hide if not logged in
    }
  }

  // Fetch and render posts based on the current page
  async function loadPosts(page) {
    try {
      const posts = await readPosts(page, postsPerPage);
      postList.innerHTML = ''; // Clear any existing content

      posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'col-md-6 mb-4';
        postCard.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${post.title || 'Untitled'}</h5>
              <p class="card-text">${post.body ? post.body.slice(0, 100) + '...' : 'No Content Available'}</p>
              <a href="/post/index.html?id=${post.id}" class="btn btn-primary">Read More</a>
            </div>
          </div>
        `;
        postList.appendChild(postCard);
      });

      renderPagination();
    } catch (error) {
      console.error('Failed to load recent posts:', error);
    }
  }

  // Render pagination buttons
  function renderPagination() {
    pagination.innerHTML = ''; // Clear existing pagination buttons

    // Add "Previous" button
    const prevButton = document.createElement('li');
    prevButton.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevButton.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        loadPosts(currentPage);
      }
    });
    pagination.appendChild(prevButton);

    // Add individual page numbers
    for (let i = 1; i <= 5; i++) { // Adjust the range if needed
      const pageItem = document.createElement('li');
      pageItem.className = `page-item ${i === currentPage ? 'active' : ''}`;
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      pageItem.addEventListener('click', () => {
        currentPage = i;
        loadPosts(currentPage);
      });
      pagination.appendChild(pageItem);
    }

    // Add "Next" button
    const nextButton = document.createElement('li');
    nextButton.className = 'page-item';
    nextButton.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextButton.addEventListener('click', () => {
      currentPage++;
      loadPosts(currentPage);
    });
    pagination.appendChild(nextButton);
  }

  // Initial load
  loadPosts(currentPage);
  toggleLogoutButton(); // Check login status on page load
});
