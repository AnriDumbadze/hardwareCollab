// Function to generate a random string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Example: Generate a random string of length 10
const randomString = generateRandomString(10);
console.log(randomString); // Output: Random string of length 10

// Import the v4 method from the uuid library
const { v4: uuidv4 } = require('uuid');

// Generate a UUID (v4)
const uuid = uuidv4();
console.log(uuid); // Output: UUID (version 4)
