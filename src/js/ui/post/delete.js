// src/js/ui/post/delete.js
import { deletePost } from '../../api/post.js';

document.addEventListener('DOMContentLoaded', () => {
  const deleteButton = document.getElementById('deleteButton');
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    console.error('No post ID specified in URL.');
    return;
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
      try {
        const confirmed = confirm('Are you sure you want to delete this post?');
        if (!confirmed) return;

        // Attempt to delete the post
        const result = await deletePost(postId);
        console.log('Delete result:', result);
        
        alert('Post deleted successfully');
        
        // Redirect to posts list after deletion
        window.location.href = '/posts/index.html';
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post. Please try again.');
      }
    });
  } else {
    console.error('Delete button not found in the DOM.');
  }
});
