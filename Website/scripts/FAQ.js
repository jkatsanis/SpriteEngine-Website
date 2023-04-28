let messageInput;
let chatHistory;
let chatContainer;
let userName;

// Function to add message to chat history and display it
function displayMessage(message) {
    chatHistory.push(message);
    chatContainer.innerHTML += '<div class ="chat-message">' + "<a class ='userName'>"+ userName + "</a>" + "<br/>" + "<a class='chatMessage'>" + message + "</a>"+ "<br/>"+ "<br/>" +"</div>";
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
    userName = 'User123';


}

document.addEventListener('DOMContentLoaded',(event) => init());
