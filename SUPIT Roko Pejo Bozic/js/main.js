/**
 * Main application module
 * Handles core functionality and navigation across the site
 */

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});

/**
 * Updates the navigation bar based on user authentication status
 * Shows/hides appropriate links and handles user session state
 */
function updateNavbar() {
    const nav = document.getElementById('navbar-content');
    if (!nav) {
        console.warn('Navigation element not found');
        return;
    }

    let isLoggedIn;
    try {
        isLoggedIn = localStorage.getItem('loggedInUser');
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        isLoggedIn = false;
    }

    // Template for navigation items with conditional rendering
    nav.innerHTML = `
        ${!isLoggedIn ? '<a href="login.html" id="login-link">🔐 Login</a>' : '<a href="#" onclick="logout()">🚪 Logout</a>'}
        <a href="index.html">🏠 Home</a>
        <a href="about-us.html">💬 About Us</a>
        <a href="news.html">📰 News</a>
        ${isLoggedIn ? '<a href="curriculum.html">📚 Curriculum</a>' : ''}
        <a href="#" data-bs-toggle="modal" data-bs-target="#contactModal">✉️ Contact</a>
    `;
}

/**
 * Handles user logout by clearing session data and redirecting to login
 */
function logout() {
    try {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('jwtToken');
        
        // Add a slight delay before redirecting for better UX
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        console.error('Error during logout:', error);
        window.location.href = 'index.html';
    }
}

/**
 * Handles authentication errors by redirecting to login page
 * @param {Response} response - The failed API response
 */
async function handleAuthError(response) {
    // ... existing code ...
}


  
  
  