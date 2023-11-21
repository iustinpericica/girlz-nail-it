// script.js

// Get the button element
const changeColorButton = document.getElementById('changeColorButton');

// Add a click event listener to the button
changeColorButton.addEventListener('click', () => {
    // Generate a random color
    const randomColor = getRandomColor();

    // Change the background color of the body
    document.body.style.backgroundColor = randomColor;
});

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
