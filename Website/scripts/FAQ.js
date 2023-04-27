let messageInput;
let chatHistory;
let chatContainer;

// Function to add message to chat history and display it
function displayMessage(message) {
    chatHistory.push(message);
    chatContainer.innerHTML += "<p>" + message + "</p>";
}

// Function to send message
function sendMessage() {
    console.log((messageInput));
    let message = messageInput.value;
    if (message) {
        console.log(message);
        displayMessage(message);
        messageInput.value = "";
    }
}

function init()
{
    console.log("done");
    chatHistory = [];
    chatContainer = document.getElementById("chat-container");
    messageInput  = document.getElementById("message-input");
}

document.addEventListener('DOMContentLoaded',(event) => init());
