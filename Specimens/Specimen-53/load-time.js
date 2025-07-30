// Ensure the DOM is fully loaded before trying to access elements
document.addEventListener('DOMContentLoaded', function() {
    // Find the span element by its ID
    const loadTimeSpan = document.getElementById('loadTimeDisplay');

    // If the element exists, update its content with the current time
    if (loadTimeSpan) {
        loadTimeSpan.textContent = new Date().toLocaleTimeString();
    }
});
