// src/js/ui/post/create.js
import { createPost } from '/src/js/api/post.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('createPostForm');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Convert form data into an object
      const formData = new FormData(form);
      const postData = Object.fromEntries(formData.entries());

      // Convert tags to an array (assuming tags are comma-separated)
      postData.tags = postData.tags ? postData.tags.split(',').map(tag => tag.trim()) : [];

      try {
        const post = await createPost(postData);
        
        // Redirect to the newly created post's view page with updated path for GitHub Pages
        window.location.href = `/post/index.html?id=${post.id}`;
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post: ' + error.message);
      }
    });
  } else {
    console.error("Create post form not found in the DOM");
  }
});
