function createEcho(text) {
    const container = document.getElementById('echoChamber');
    container.innerHTML = ''; // Clear previous

    for (let i = 0; i < 5; i++) {
        const layer = document.createElement('div');
        layer.className = `echo-layer layer-${i}`;
        // The "Mutation": Every layer gets slightly more distorted
        layer.innerText = i === 0 ? text : mutateText(text, i);
        container.appendChild(layer);
    }
}

function mutateText(text, level) {
    const chars = "!@#$%^&*()_+";
    return text.split('').map(char => 
        Math.random() < (level * 0.1) ? chars[Math.floor(Math.random() * chars.length)] : char
    ).join('');
}
