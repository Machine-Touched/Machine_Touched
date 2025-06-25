How to Use and Test:

    Save all files: Save index.html, background-monitors.html, monitor1.html, monitor2.html, and monitor3.html into the same folder on your computer.
    Open index.html: Double-click index.html (or open it in your web browser).
    Observe the background: You will see your main website content with a dynamic, overlapping network of monitors in the background. The monitors will be randomly sized, positioned, and layered using a wide
    range of 
    z-index values to create a complex visual depth.
    Open Developer Tools: Press F12 (or right-click and choose "Inspect" / "Inspect Element") to open your browser's developer console. Go to the "Console" tab.
    Interact: Click the "Send to Next" (or "Ping Next", "Transmit") button on any of the visible background monitors.
    See the Communication:
        You will see messages appear in the small "Messages:" log area within the monitor you clicked.
        Crucially, you'll see messages in the browser's console indicating when a message is sent from a monitor to its parent (background-monitors.html), and then forwarded to the next monitor in the dynamically 
        generated chain. The target monitor will also log that it received a message.

This setup showcases a powerful combination of visual layering with z-index and secure, robust communication between different parts of your webpage using iframes and postMessage. Remember to host all these files 
on your website, www.machinetouched.w3spaces.com, for them to operate under the same origin for postMessage 
security.
