let APP_ID = "309334447f2841a6b01261773a92d56b"


let token = null;
let uid = String(Math.floor(Math.random() * 10000))

let client;
let channel;

let queryString = window.location.search
let urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get('room')

if(!roomId){
    window.location = 'lobby.html'
}

let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}


let constraints = {
    video:{
        width:{min:640, ideal:1920, max:1920},
        height:{min:480, ideal:1080, max:1080},
    },
    audio:true
}

let init = async () => {
    client = await AgoraRTM.createInstance(APP_ID)
    await client.login({uid, token})

    channel = client.createChannel('main')
    await channel.join()

    channel.on('MemberJoined', handleUserJoined)
    channel.on('MemberLeft', handleUserLeft)

    client.on('MessageFromPeer', handleMessageFromPeer)

    localStream = await navigator.mediaDevices.getUserMedia(constraints)
    document.getElementById('user-1').srcObject = localStream
}
 

let handleUserLeft = (MemberId) => {
    document.getElementById('user-2').style.display = 'none'
    document.getElementById('user-1').classList.remove('smallFrame')
}

let handleMessageFromPeer = async (message, MemberId) => {

    message = JSON.parse(message.text)

    if(message.type === 'offer'){
        createAnswer(MemberId, message.offer)
    }

    if(message.type === 'answer'){
        addAnswer(message.answer)
    }

    if(message.type === 'candidate'){
        if(peerConnection){
            peerConnection.addIceCandidate(message.candidate)
        }
    }


}

let handleUserJoined = async (MemberId) => {
    console.log('A new user joined the channel:', MemberId)
    createOffer(MemberId)
}


let createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream
    document.getElementById('user-2').style.display = 'block'

    document.getElementById('user-1').classList.add('smallFrame')


    if(!localStream){
        localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
        document.getElementById('user-1').srcObject = localStream
    }

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            client.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId)
        }
    }
}

let createOffer = async (MemberId) => {
    await createPeerConnection(MemberId)

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    client.sendMessageToPeer({text:JSON.stringify({'type':'offer', 'offer':offer})}, MemberId)
}


let createAnswer = async (MemberId, offer) => {
    await createPeerConnection(MemberId)

    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    client.sendMessageToPeer({text:JSON.stringify({'type':'answer', 'answer':answer})}, MemberId)
}


let addAnswer = async (answer) => {
    if(!peerConnection.currentRemoteDescription){
        peerConnection.setRemoteDescription(answer)
    }
}


let leaveChannel = async () => {
    await channel.leave()
    await client.logout()
}

let toggleCamera = async () => {
    let videoTrack = localStream.getTracks().find(track => track.kind === 'video')

    if(videoTrack.enabled){
        videoTrack.enabled = false
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    }else{
        videoTrack.enabled = true
        document.getElementById('camera-btn').style.backgroundColor = '#1e2d3b'
    }
}

let toggleMic = async () => {
    let audioTrack = localStream.getTracks().find(track => track.kind === 'audio')

    if(audioTrack.enabled){
        audioTrack.enabled = false
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    }else{
        audioTrack.enabled = true
        document.getElementById('mic-btn').style.backgroundColor = '#1e2d3b'
    }
}

  
window.addEventListener('beforeunload', leaveChannel)

document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)


init()
// Function to toggle dark mode
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    
    // Get a reference to the theme toggle button
    const themeToggleButton = document.querySelector('.theme-toggle');

    // Toggle the button's color based on the presence of 'dark-mode' class
    if (document.body.classList.contains('dark-mode')) {
        themeToggleButton.style.backgroundColor = 'rgba(139, 138, 146, 0.9)'; // when dark mode is enabled
    } else {
        themeToggleButton.style.backgroundColor = '#585959'; // Change to original color when dark mode is disabled
    }
}


// Event listener for the theme toggle button
document.querySelector('.theme-toggle').addEventListener('click', toggleDarkMode);

const toggleScreenShare = () => {
    document.body.classList.toggle('screen-sharing'); // Toggle the screen sharing class
    
    // Get a reference to the screen share button
    const screenShareButton = document.querySelector('.Screenshare');

    // Toggle the button's color based on the presence of 'screen-sharing' class
    if (document.body.classList.contains('screen-sharing')) {
        screenShareButton.style.backgroundColor = 'rgb(17, 133, 161)'; // Set the active color when screen sharing is enabled
    } else {
        screenShareButton.style.backgroundColor = '#585959'; // Set the normal color when screen sharing is disabled
    }

    // Your logic to toggle screen sharing feature goes here
}
// Get a reference to the screen share button
const screenShareButton = document.getElementById('screen');

// Add event listener to toggle screen share when clicked
screenShareButton.addEventListener('click', toggleScreenShare);



let rtmClient = AgoraRTM.createInstance(APP_ID);

let rtmChannel;

// Function to initialize RTM client
const initRTM = async () => {
    try {
        rtmClient = AgoraRTM.createInstance(APP_ID);
        await rtmClient.login({ uid });
        rtmChannel = rtmClient.createChannel(roomId);
        await rtmChannel.join();
        rtmChannel.on('ChannelMessage', ({ text }, senderId) => {
            // Display received message in chat display
            displayChatMessage(senderId, text);
        });
    } catch (error) {
        console.error('Error initializing RTM:', error);
    }
}

// Function to send a message to the RTM channel
// const sendRTMMessage = async (message) => {
//     try {
//         // Send the message to the RTM channel
//         await rtmChannel.sendMessage({ text: message });

//         // Display the sent message in the chat display
//         displayChatMessage('You', message); 
//     } catch (error) {
//         console.error('Error sending message:', error);
//     }
// }
// Function to send a message to the RTM channel
// const sendRTMMessage = async (message) => {
//     try {
//         if (rtmClient) {
//             // Check if the client is logged in, if not, attempt to log in
//             if (!rtmClient.isLoggedIn()) {
//                 await rtmClient.login({ uid }); // Log in the client
//             }
            
//             // Send the message
//             await rtmChannel.sendMessage({ text: message });
//             displayChatMessage('You', message); // Display sent message in chat display
//         } else {
//             console.error('RTM client is not initialized. Cannot send message.');
//         }
//     } catch (error) {
//         console.error('Error sending message:', error);
//     }
// }
// Function to send a message to the RTM channel
// const sendRTMMessage = async (message) => {
//     try {
//         if (rtmClient && typeof rtmClient.isLoggedIn === 'function' && rtmClient.isLoggedIn()) {
//             await rtmChannel.sendMessage({ text: message });
//             displayChatMessage('You', message); // Display sent message in chat display
//         } else {
//             displayChatMessage('You', message);
//         }
//     } catch (error) {
//         console.error('Error sending message:', error);
//     }
// }

// Function to handle incoming messages from the RTM channel


// Initialize Agora RTM client and set up chat functionality

const CHANNEL = 'main';

const initiatRTM = async () => {
    try {
        rtmClient = AgoraRTM.createInstance(APP_ID);
        await rtmClient.login({ uid });
        rtmChannel = rtmClient.createChannel(CHANNEL);
        await rtmChannel.join();
        rtmChannel.on('ChannelMessage', ({ text }, senderId) => {
            // Display received message in chat display
            displayChatMessage(senderId, text);
        });
    } catch (error) {
        console.error('Error initializing RTM:', error);
    }
}

const sendMessageToRTMChannel = async (message) => {
    try {
        await rtmChannel.sendMessage({ text: message });
        displayChatMessage('You', message); // Display sent message in chat display
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

const sendMessage = async (e) => {
    e.preventDefault();
    let messageInput = document.getElementById('chat-input');
    let message = messageInput.value;

    if (message.trim() !== '') { // Check if message is not empty
        await sendMessageToRTMChannel(message); // Call sendMessage function from main.js
    }
    
    messageInput.value = '';
    let messageObj = {
        message: message,
        displayName: 'Me'
    };
    addmessageToDom('Me', message);
}

const addmessageToDom = (displayName, message) => {
    let messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${displayName}:</strong> ${message}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 

    let messagesWrapper = document.getElementById('chat-box')

    let newMessage = `<div id="chat-box">
                        <div id="chat-display">
                            <strong class="message__author">${displayName}</strong>
                            <p class="message__text">${message}</p>
                        </div>
                    </div>`

    messagesWrapper.insertAdjacentHTML('beforeend', newMessage)

    let lastMessage = document.querySelector('#chat-box #chat-box:last-child')
    if(lastMessage){
        lastMessage.scrollIntoView()
    }
}

