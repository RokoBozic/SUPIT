/**
 * Authentication module for handling user login and registration
 */

// API endpoints
const API_ENDPOINTS = {
    LOGIN: 'https://www.fulek.com/data/api/user/login',
    REGISTER: 'https://www.fulek.com/data/api/user/register'
};

// Initialize authentication forms when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

/**
 * Handles user login form submission
 * @param {Event} event - The form submission event
 */
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.isSuccess) {
            showMessage('✅ Login successful! Redirecting to homepage...', 'success');
            localStorage.setItem('jwtToken', data.data.token);
            localStorage.setItem('loggedInUser', email);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showMessage(`❌ ${data.message}`, 'danger');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('❌ Failed to connect to the server.', 'danger');
    }
}

/**
 * Handles user registration form submission
 * @param {Event} event - The form submission event
 */
async function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch(API_ENDPOINTS.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.isSuccess) {
            showMessage('✅ Registration successful. You can now login.', 'success');
            // Clear form after successful registration
            event.target.reset();
        } else {
            showMessage(`❌ ${data.message}`, 'danger');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('❌ Failed to connect to the server.', 'danger');
    }
}

/**
 * Displays a message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of message (success/error)
 */
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    if (!messageDiv) {
        console.warn('Message div not found');
        return;
    }
    messageDiv.innerHTML = `<div class="text-${type}">${message}</div>`;
}
