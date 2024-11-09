// src/js/utilities/errorHandler.js

export function displayError(message) {
    const errorContainer = document.getElementById('error-container');
  
    // Create the error container if it doesn't exist
    if (!errorContainer) {
      const newErrorContainer = document.createElement('div');
      newErrorContainer.id = 'error-container';
      newErrorContainer.style.color = 'red';
      newErrorContainer.style.marginTop = '20px';
      document.body.appendChild(newErrorContainer);
    }
  
    document.getElementById('error-container').textContent = message;
  }
  