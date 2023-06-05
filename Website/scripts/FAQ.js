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
    let message = messageInput.value;
    if (message) {
        console.log(message);
        displayMessage(message);
        messageInput.value = "";
    }
}

function createTestThread()
{

}

function init()
{
    chatHistory = [];
    chatContainer = document.getElementById("chat-container");
    messageInput  = document.getElementById("message-input");
    userName = 'User123';

    messageInput.addEventListener('keypress', function(event) {
        if (event.keyCode === 13) {
            sendMessage();
        }
    });
}

document.addEventListener('DOMContentLoaded',(event) => init());
