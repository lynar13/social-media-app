import { readPost, updatePost } from '../../api/post.js';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const form = document.getElementById('editPostForm');
  console.log('Post ID:', postId);  // Ensure this outputs the correct ID

  if (!postId) {
    alert('No post ID specified.');
    return;
  }

  try {
    const post = await readPost(postId);
    if (!post) throw new Error('Post data not found');

    // Ensure that form and its fields exist before populating them
    if (form) {
      const titleField = form.querySelector('#title');
      const bodyField = form.querySelector('#body');
      const tagsField = form.querySelector('#tags');

      if (titleField) {
        titleField.value = post.title || 'No Title Available';
      }
      if (bodyField) {
        bodyField.value = post.body || 'No Content Available';
      }
      if (tagsField) {
        tagsField.value = Array.isArray(post.tags) ? post.tags.join(', ') : '';
      }

      // Handle form submission
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const updatedData = Object.fromEntries(formData.entries());

        // Convert the tags string into an array
        updatedData.tags = updatedData.tags.split(',').map(tag => tag.trim());
        console.log('Updated Post Data:', updatedData); // Log the updated data for debugging

        try {
          // Update the post using the modified payload structure
          await updatePost(postId, updatedData);
          window.location.href = `/post/index.html?id=${postId}`;
        } catch (error) {
          console.error('Failed to update post:', error);
          alert('Failed to update post');
        }
      });
    } else {
      console.error('Form element not found');
    }
  } catch (error) {
    console.error('Failed to load post data:', error);
    alert('Failed to load post');
  }
});
