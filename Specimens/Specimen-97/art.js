document.addEventListener('DOMContentLoaded', () => {
    const coreDataElement = document.getElementById('coreData');
    const statusMessages = [
        "A D M E C H I U S",
        "P R O B I N G",
        "A N A L Y S I N G",
        "I N T E R N A L_F A U L T",
        "H E R E S Y__D E T E C T E D"
    ];

    let messageIndex = 0;

    // Function to update the text with a subtle effect
    function updateStatus() {
        // Simple iteration through messages
        messageIndex = (messageIndex + 1) % statusMessages.length;
        const newText = `<span class="symbol">></span> ${statusMessages[messageIndex]} <span class="symbol"><</span>`;
        
        // Apply a brief flicker class before changing content
        coreDataElement.classList.add('flicker-out');
        setTimeout(() => {
            coreDataElement.innerHTML = newText;
            coreDataElement.classList.remove('flicker-out');
        }, 300); // Wait for the flicker to complete
    }

    // Add a class for the flicker effect to the CSS (since we cannot use inline styles)
    const style = document.createElement('style');
    style.textContent = `
        .flicker-out {
            color: var(--glitch-color) !important;
            filter: blur(1px);
        }
    `;
    document.head.appendChild(style);

    // Change the status every 5 seconds
    setInterval(updateStatus, 5000);
});
