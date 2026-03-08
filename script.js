// Messages and photos to reveal
const messages = [
    { text: "You are amazing! 💜", image: "https://via.placeholder.com/200?text=You+Are+Amazing" },
    { text: "Keep shining! ✨", image: "https://via.placeholder.com/200?text=Keep+Shining" },
    { text: "Stay strong! 💪", image: "https://via.placeholder.com/200?text=Stay+Strong" },
    { text: "You inspire us! 🌟", image: "https://via.placeholder.com/200?text=You+Inspire+Us" },
    { text: "Happy Women's Day! 🌸", image: "https://via.placeholder.com/200?text=Womens+Day" },
    { text: "You rock! 🎉", image: "https://via.placeholder.com/200?text=You+Rock" }
];

let userImage = null;
let userName = "";
let revealedHearts = 0;

// Auto-transition from loading page
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingPage').style.display = 'none';
        document.getElementById('greetingPage').style.display = 'block';
    }, 3000);
});

// Start magic function
function startMagic() {
    const nameInput = document.getElementById('nameInput').value;
    const imageInput = document.getElementById('imageInput');

    if (!nameInput) {
        alert('Please enter your name!');
        return;
    }

    if (!imageInput.files[0]) {
        alert('Please upload an image!');
        return;
    }

    userName = nameInput;
    const reader = new FileReader();

    reader.onload = function(event) {
        userImage = event.target.result;
        
        // Show greeting output
        const output = document.getElementById('greetingOutput');
        output.innerHTML = `<p style="font-size: 20px; color: #333;">Hello, <strong>${userName}</strong>! 👋</p>
                           <img src="${userImage}" alt="Your Image" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">`;
        
        // Transition to game page after 2 seconds
        setTimeout(() => {
            document.getElementById('greetingPage').style.display = 'none';
            document.getElementById('gamePage').style.display = 'block';
            document.getElementById('personName').textContent = `💖 Pop hearts for ${userName}! 💖`;
            createHearts();
        }, 2000);
    };

    reader.readAsDataURL(imageInput.files[0]);
}

// Create heart elements
function createHearts() {
    const container = document.getElementById('heartContainer');
    container.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        heart.onclick = () => popHeart(heart, i);
        container.appendChild(heart);
    }
}

// Pop heart and reveal message
function popHeart(heart, index) {
    if (heart.classList.contains('popped')) return;

    heart.classList.add('popped');
    revealedHearts++;

    const message = messages[index];
    heart.innerHTML = '';
    
    const reveal = document.createElement('div');
    reveal.className = 'message-reveal';
    reveal.innerHTML = `<p><strong>${message.text}</strong></p>
                       <img src="${message.image}" alt="Message">`;
    
    heart.appendChild(reveal);
    heart.onclick = null;

    // All hearts popped - show celebration
    if (revealedHearts === 6) {
        setTimeout(() => {
            alert(`🎉 Amazing! You've revealed all the love, ${userName}! 💜\n\nHappy Women's Day!`);
        }, 500);
    }
}
