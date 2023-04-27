// Initialize variables
let chatHistory = [];
let chatContainer = document.getElementById("chat-container");
let messageInput = document.getElementById("message-input");

// Function to add message to chat history and display it
function displayMessage(message) {
    chatHistory.push(message);
    chatContainer.innerHTML += "<p>" + message + "</p>";
}

// Function to send message
function sendMessage() {
    let message = messageInput.value;
    if (message) {
        console.log(message);
        displayMessage(message);
        messageInput.value = "";
    }
}

document.addEventListener('DOMContentLoaded',(event) => console.log('done'));
