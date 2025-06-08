/**
 * Contact Modal Handler
 * Manages the contact form modal functionality across all pages
 */

// Modal HTML template
const modalTemplate = `
<div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <form id="contactForm" method="POST" action="https://www.fulek.com/mvc/supit/project-contact-form" target="_blank" class="needs-validation" novalidate>
            <div class="modal-content bg-white">
                <div class="modal-header">
                    <h5 class="modal-title text-dark" id="contactModalLabel">
                        <i class="fas fa-envelope text-warning"></i> Contact Us
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="fullName" class="form-label text-dark">Full Name</label>
                        <input type="text" name="FullName" id="fullName" 
                               placeholder="Enter your full name" required 
                               class="form-control text-dark border shadow-sm"
                               minlength="2" maxlength="100">
                        <div class="invalid-feedback">Please enter your full name.</div>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label text-dark">E-mail</label>
                        <input type="email" name="Email" id="email" 
                               placeholder="Enter your e-mail" required 
                               class="form-control text-dark border shadow-sm"
                               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
                        <div class="invalid-feedback">Please enter a valid email address.</div>
                    </div>
                    <div class="mb-3">
                        <label for="importance" class="form-label text-dark">Message Importance</label>
                        <select name="Importance" id="importance" 
                                class="form-select text-dark border shadow-sm" required>
                            <option value="">Select importance</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <div class="invalid-feedback">Please select message importance.</div>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label text-dark">Message</label>
                        <textarea name="Message" id="message" 
                                  placeholder="Type your message here" required 
                                  class="form-control text-dark border shadow-sm" 
                                  rows="4" minlength="10" maxlength="1000"></textarea>
                        <div class="invalid-feedback">Please enter a message (minimum 10 characters).</div>
                    </div>
                    <div class="form-check mb-3">
                        <input type="checkbox" name="ReceiveNewsletter" value="true" 
                               class="form-check-input" id="newsletterCheck">
                        <label for="newsletterCheck" class="form-check-label text-dark">
                            Receive Newsletter
                        </label>
                    </div>
                </div>
                <div class="modal-footer bg-white">
                    <button type="submit" class="btn btn-warning">
                        <i class="fas fa-paper-plane"></i> Send
                    </button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
`;

/**
 * Initializes the contact modal and sets up form validation
 * Adds the modal to the page if it doesn't exist and attaches event listeners
 */
function initContactModal() {
    // Add modal to the page if it doesn't exist
    if (!document.getElementById('contactModal')) {
        document.body.insertAdjacentHTML('beforeend', modalTemplate);
    }

    // Initialize form validation
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

/**
 * Handles form submission with validation
 * @param {Event} event - The form submission event
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Form is valid, you can add additional handling here if needed
    form.submit();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactModal); 