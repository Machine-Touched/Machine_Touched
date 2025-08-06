// This function will get the current time and display it
function updateTime() {
    const now = new Date(); // Gets the current date and time
    
    // Formats the time based on the user's local settings (e.g., 10:30:45 AM or 14:30:45)
    const timeString = now.toLocaleTimeString(); 
    
    // Find the HTML element where we want to display the time
    const timeDisplayElement = document.getElementById('current-time-display');
    
    // Update the content of that element
    if (timeDisplayElement) { // Check if the element exists to prevent errors
        timeDisplayElement.textContent = timeString;
    }
}

// Run the updateTime function once immediately when the page loads
// This ensures the time is displayed right away, not after a 1-second delay
updateTime();

// Set up the function to run every 1000 milliseconds (1 second)
// This will make the time update every second, creating a live clock
setInterval(updateTime, 1000);
