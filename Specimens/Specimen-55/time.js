function displayTime() {
    const now = new Date(); // Create a new Date object representing the current date and time
    
    // Format the time (e.g., HH:MM:SS)
    const hours = String(now.getHours()).padStart(2, '0'); // Get hours (0-23), pad with 0 if single digit
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes (0-59), pad with 0
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Get seconds (0-59), pad with 0
    
    const timeString = `${hours}:${minutes}:${seconds}`; // Combine into a string

    // Get the element where you want to display the time
    const timeDisplayElement = document.getElementById('current-time');
    
    // Update the content of that element
    if (timeDisplayElement) { // Check if the element exists to prevent errors
        timeDisplayElement.textContent = timeString;
    }
}

// Call the function once immediately to display the time as soon as possible
displayTime();

// Update the time every 1 second (1000 milliseconds)
setInterval(displayTime, 1000);
