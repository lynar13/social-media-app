import { readPosts } from '/social-media-app/src/js/api/post.js';

document.addEventListener('DOMContentLoaded', () => {
  let currentPage = 1;
  const postsPerPage = 12;

  const postList = document.getElementById('postList');
  const pagination = document.getElementById('pagination');
  
  const loginButton = document.getElementById('loginButton');
  const registerButton = document.getElementById('registerButton');
  const logoutButton = document.getElementById('logoutButton');

  // Function to toggle visibility of login, register, and logout buttons
  function updateAuthButtons() {
    const isLoggedIn = localStorage.getItem('token'); // Check if token exists

    if (isLoggedIn) {
      // User is logged in, show logout button, hide login and register buttons
      loginButton.style.display = 'none';
      registerButton.style.display = 'none';
      logoutButton.style.display = 'inline-block';
    } else {
      // User is not logged in, show login and register buttons, hide logout button
      loginButton.style.display = 'inline';
      registerButton.style.display = 'inline';
      logoutButton.style.display = 'none';
    }
  }

  // Call the function on page load
  updateAuthButtons();

  // Add event listener to logout button to log out the user
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token'); // Remove token from localStorage
      updateAuthButtons(); // Update button visibility
    });
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
              <a href="/social-media-app/post/index.html?id=${post.id}" class="btn btn-primary">Read More</a> <!-- Updated path for GitHub Pages -->
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
});
