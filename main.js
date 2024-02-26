const APP_ID = "352d6ad86462494d904afc4cfeeda64b"
let TOKEN = "007eJxTYOAt/imtUHPvl+r61MrOuJPZPXt2ipSkL0rq2LAs/vGUPcIKDMamRilmiSkWZiZmRiaWJimWBiaJackmyWmpqSmJZiZJX11vpDYEMjJMjqxiYIRCEJ+FITcxM4+BAQCS3iDi"
const CHANNEL = "main"
const uid = String(Math.floor(Math.random() * 232))

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let sendMessage = async (e) => {
    e.preventDefault();
    let messageInput = document.getElementById('chat-input');
    let message = messageInput.value;

    if (message.trim() !== '') { // Check if message is not empty
        await sendMessage(message); // Call sendMessage function from main.js
    }
    
    messageInput.value = '';
    let messageObj = {
        message: message,
        displayName: 'Me'
    };
    addmessageToDom('Me', message);
    await CHANNEL.sendMessage({text: JSON.stringify(messageObj)});
}

let initiatRTM = async () => {
    let  = await AgoraRTM.createInstance(APP_ID) 
    await client.login({uid, tocken})

      const channel = await client.createChannel(CHANNEL)
      await channel.join()

      let form = document.getElementById("form")

      form.addEventListener("submit", async (e) => {
          e.preventDefault()
          let message = e.target.message.value
          await channel.sendMessage({text:message, type:'text'})
          form.reset()

          handleMessage({text:message})
      })

      channel.on('ChannelMessage', (message, peerID) => {
        console.log('Message:', message)
        handleMessage(message)
      })
}

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

let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;


let addmessageToDom = (displayName, message) => {
    let messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${displayName}:</strong> ${message}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 

    let messagesWrapper = document.getElementById('messages')

    let newMessage = `<div id="chat-box">
                        <div id="chat-display">
                            <strong class="message__author">${displayName}</strong>
                            <p class="message__text">${message}</p>
                        </div>
                    </div>`

    messagesWrapper.insertAdjacentHTML('beforeend', newMessage)

    let lastMessage = document.querySelector('#messages #chat-box:last-child')
    if(lastMessage){
        lastMessage.scrollIntoView()
    }
}



// Additional script for handling form submission
let messageForm = document.getElementById('message__form');
messageForm.addEventListener('submit', sendMessage);



let joinAndDisplayLocalStream = async () => {

    client.on('user-published', handleUserJoined)
    
    client.on('user-left', handleUserLeft)
    client.on('user_message', handleMessage)

    
    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)


    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 
    

    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)
    
    await client.publish([localTracks[0], localTracks[1]])
}

let joinStream = async () => {
    await joinAndDisplayLocalStream()
    document.getElementById('join-btn').style.display = 'none'
    document.getElementById('stream-controls').style.display = 'flex'
    document.getElementById('message_control').style.display = 'flex'
    document.getElementById('message__form').style.display = 'flex'
    


}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user 
    await client.subscribe(user, mediaType)

    if (mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null){
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div> 
                 </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        user.videoTrack.play(`user-${user.uid}`)
    }

    if (mediaType === 'audio'){
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
    for(let i = 0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()
    document.getElementById('join-btn').style.display = 'block'
    document.getElementById('stream-controls').style.display = 'none'
    document.getElementById('message_control').style.display = 'none'
    document.getElementById('message_control').style.display = 'none'
    document.getElementById('message__form').style.display = 'flex'
    document.getElementById('video-streams').innerHTML = ''
}

let toggleMic = async (e) => {
    if (localTracks[0].muted){
        await localTracks[0].setMuted(false)
        e.target.innerText = 'Mic on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[0].setMuted(true)
        e.target.innerText = 'Mic off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

let toggleCamera = async (e) => {
    if(localTracks[1].muted){
        await localTracks[1].setMuted(false)
        e.target.innerText = 'Camera on'
        e.target.style.backgroundColor = 'cadetblue'
    }else{
        await localTracks[1].setMuted(true)
        e.target.innerText = 'Camera off'
        e.target.style.backgroundColor = '#EE4B2B'
    }
}

document.getElementById('join-btn').addEventListener('click', joinStream)
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mic-btn').addEventListener('click', toggleMic)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('message__form').addEventListener('submit', sendMessage)



























rtmChannel.on('ChannelMessage', ({ text }, senderId) => {
    displayChatMessage(senderId, text);
});

// Function to send a message to the RTM channel
const sendRTMMessage = async (message) => {
    try {
        await rtmChannel.sendMessage({ text: message });
        displayChatMessage('You', message); // Display sent message in chat display
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Function to display chat messages in the chat display area
const displayChatMessage = (senderId, message) => {
    const chatDisplay = document.getElementById('chat-display');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${senderId}: ${message}`;
    chatDisplay.appendChild(messageElement);
}

// Event listener for the chat input box
document.getElementById('chat-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const message = event.target.value.trim();
        if (message !== '') {
            sendRTMMessage(message);
            event.target.value = ''; // Clear the input box after sending the message
        }
    }
});


const handleChatInput = (event) => {
    if (event.key === 'Enter') {
        const message = event.target.value.trim();
        if (message !== '') {
            console.log('Sending message:', message); // Log the message being sent
            sendRTMMessage(message);
            event.target.value = ''; // Clear the input box after sending the message
        }
    }
}


// Initialize the RTM client and join the RTM channel
initRTM();

// Add event listener for the chat input box
document.getElementById('chat-input').addEventListener('keypress', handleChatInput);
