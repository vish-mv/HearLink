const APP_ID = "352d6ad86462494d904afc4cfeeda64b"
const TOKEN = "007eJxTYJjTZKhoFe23P8JlYaptjHxYW/Yv50q12/FVoodSayYWPldgMDY1SjFLTLEwMzEzMrE0SbE0MElMSzZJTktNTUk0M0mqazme2hDIyODF8ZyZkQECQXwWhtzEzDwGBgC0fR4H"
const CHANNEL = "main"

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {

    client.on('user-published', handleUserJoined)
    
    client.on('user-left', handleUserLeft)
    
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
