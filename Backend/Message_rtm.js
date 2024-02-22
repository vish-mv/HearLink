let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;


let handleMessage = async (message, UID) => {
    try {
        console.log('Message Received: ', message);
        let data = JSON.parse(message.text);
        console.log('Message:', data);

        // Handle the message here
    } catch (error) {
        console.error('Error handling message:', error);
    }
}

let sendMessage = async (e) => {
    e.preventDefault();
    let messageInput = document.getElementById('message_input');
    let message = messageInput.value;
    messageInput.value = '';
    let messageObj = {
        message: message,
        displayName: 'Me'
    };
    addmessageToDom('Me', message);
    await CHANNEL.sendMessage({text: JSON.stringify(messageObj)});
}

let addmessageToDom = (displayName, message) => {
    let messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${displayName}:</strong> ${message}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 
}



let messageForm = document.getElementById('message_form');
messageForm.addEventListener('submit', sendMessage);