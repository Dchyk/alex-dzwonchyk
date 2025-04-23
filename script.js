// co-written with gemini-2.5-pro

const maskedTextContainer = document.getElementById('masked-text-container');
const h1Element = document.querySelector('#masked-text-content h1'); // Get H1 element
const h2Element = document.querySelector('#masked-text-content h2'); // Get H2 element
// Use window dimensions
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// Ball properties
const ball = {
    x: windowWidth / 2,
    y: windowHeight / 2,
    radius: 150, // 200px diameter
    color: 'black', // Not visually used now, but keep for logic if needed
    dx: 100, // Halved initial horizontal velocity
    dy: 100  // Halved initial vertical velocity
};

// Calculate initial speed
const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

// Helper function to generate random hex color
function getRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const aspects = [
    'father',
    'husband',
    'software engineer', 
    'musician',
    'artist',
    'writer',
    'optimist',
    'human',
    'son',
    'brother',
    'friend',
    'lover',
];

function getRandomAspect() {
    return aspects[Math.floor(Math.random() * aspects.length)];
}

function update() {
    // Update ball position (physics calculation remains)
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Edge collision detection with random angle change (using window dimensions)
    let collided = false;

    // Right edge collision
    if (ball.x + ball.radius > windowWidth) {
        ball.x = windowWidth - ball.radius; // Adjust position
        collided = true;
        // Calculate angle towards center
        const angleToCenter = Math.atan2(windowHeight / 2 - ball.y, windowWidth / 2 - ball.x);
        // Add random deviation (e.g., +/- 30 degrees or PI/6 radians)
        const randomDeviation = (Math.random() - 0.5) * (Math.PI / 3);
        const finalAngle = angleToCenter + randomDeviation;
        ball.dx = speed * Math.cos(finalAngle);
        ball.dy = speed * Math.sin(finalAngle);
    }
    // Left edge collision
    else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius; // Adjust position
        collided = true;
        // Calculate angle towards center
        const angleToCenter = Math.atan2(windowHeight / 2 - ball.y, windowWidth / 2 - ball.x);
        // Add random deviation
        const randomDeviation = (Math.random() - 0.5) * (Math.PI / 3);
        const finalAngle = angleToCenter + randomDeviation;
        ball.dx = speed * Math.cos(finalAngle);
        ball.dy = speed * Math.sin(finalAngle);
    }

    // Bottom edge collision
    if (ball.y + ball.radius > windowHeight) {
        ball.y = windowHeight - ball.radius; // Adjust position
        collided = true;
        // Calculate angle towards center
        const angleToCenter = Math.atan2(windowHeight / 2 - ball.y, windowWidth / 2 - ball.x);
        // Add random deviation
        const randomDeviation = (Math.random() - 0.5) * (Math.PI / 3);
        const finalAngle = angleToCenter + randomDeviation;
        ball.dx = speed * Math.cos(finalAngle);
        ball.dy = speed * Math.sin(finalAngle);
    }
    // Top edge collision
    else if (ball.y - ball.radius < 0) {
        ball.y = ball.radius; // Adjust position
        collided = true;
        // Calculate angle towards center
        const angleToCenter = Math.atan2(windowHeight / 2 - ball.y, windowWidth / 2 - ball.x);
        // Add random deviation
        const randomDeviation = (Math.random() - 0.5) * (Math.PI / 3);
        const finalAngle = angleToCenter + randomDeviation;
        ball.dx = speed * Math.cos(finalAngle);
        ball.dy = speed * Math.sin(finalAngle);
    }

    // Change H1 color on collision
    if (collided && h1Element) {
        h1Element.style.color = getRandomHexColor();
        h2Element.style.color = getRandomHexColor();
        h2Element.textContent = getRandomAspect();
    }

    // Update the clip-path for the masked text container
    if (maskedTextContainer) {
        maskedTextContainer.style.clipPath = `circle(${ball.radius}px at ${ball.x}px ${ball.y}px)`;
    }

    // Call the update function again for the next frame
    requestAnimationFrame(update);
}

// Handle window resize
window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    // Optional: Reset ball position or adjust logic if needed on resize
    // ball.x = windowWidth / 2;
    // ball.y = windowHeight / 2;
});

// Start the animation
update(); 
