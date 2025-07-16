document.addEventListener('DOMContentLoaded', () => {
    const crowingClockwork = document.getElementById('crowingClockwork');
    const crowButton = document.getElementById('crowButton');
    const crowSound = document.getElementById('crowSound');

    // Function to trigger the crowing animation and sound
    function triggerCrow() {
        // Add the 'crowing' class to trigger CSS animation
        crowingClockwork.classList.add('crowing');

        // Play the sound (if loaded)
        if (crowSound) {
            crowSound.currentTime = 0; // Rewind to start in case it's played quickly again
            crowSound.play().catch(e => console.error("Error playing sound:", e));
        }

        // Remove the 'crowing' class after the animation completes
        // The animation duration for crow-jump is 0.3s
        setTimeout(() => {
            crowingClockwork.classList.remove('crowing');
        }, 300); // Match this to your crow-jump animation duration
    }

    // Event listener for the button
    if (crowButton) {
        crowButton.addEventListener('click', triggerCrow);
    }

    // --- Conceptual Additions (Not fully implemented for brevity) ---
    // You could expand this for automatic "crowing" at specific times:
    // function setupDailyCrow() {
    //     const now = new Date();
    //     // Example: Set to crow at 6 AM every day
    //     const crowTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);

    //     if (now > crowTime) {
    //         // If current time is past 6 AM, schedule for tomorrow
    //         crowTime.setDate(crowTime.getDate() + 1);
    //     }

    //     const timeUntilCrow = crowTime.getTime() - now.getTime();
    //     console.log(`Next crow scheduled in ${timeUntilCrow / 1000 / 60} minutes.`);

    //     setTimeout(() => {
    //         triggerCrow();
    //         // Reschedule for the next day
    //         setupDailyCrow();
    //     }, timeUntilCrow);
    // }

    // Call this if you want daily crowing, but be aware of browser tab limitations
    // setupDailyCrow();

    // You could also add other behaviors, e.g., on mouse hover or specific user actions.
    // crowingClockwork.addEventListener('mouseenter', () => {
    //     console.log('The Crowing Clockwork observes you!');
    //     // Add subtle head turn animation or eye blink
    // });
});
