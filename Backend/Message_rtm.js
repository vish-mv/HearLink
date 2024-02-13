let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;


let handleMessaage = async (message,UID) => {
    console.log('Message Received: ', message);

    let data =JSON.parse(message.text) ; 
    console.log('Message:',data)
}


let sendMessage = async (e) => {
   /* let message = document.getElementById('message').value;
    document.getElementById('message').value = '';
    let messageDiv = `<div class="message message--sent">
                        <p>${message}</p>
                      </div>`;
    messagesContainer.insertAdjacentHTML('beforeend', messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    await client.sendChannelMessage(message);  */

    e.preventDefault();

    let message = e.target.message.value

    client.sendMessage({text:JSON.stringify({'type':'chat', 'message':message, 'displayName':displayName})})


    e.target.reset()

}



let messageForm = document.getElementById('message_form');
messageForm.addEventListener('submit', sendMessage);

client.onConnect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to Agora RTM');
    }
});
