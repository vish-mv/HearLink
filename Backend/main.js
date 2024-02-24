const APP_ID = "352d6ad86462494d904afc4cfeeda64b"

//const TOKEN = "007eJxTYGj55MT17KWelElHG7c5j8Bu/XWnONY/yWn03sUkl3dY8bACg7GpUYpZYoqFmYmZkYmlSYqlgUliWrJJclpqakqimUkSw7krqQ2BjAyT1a8zMEIhiM/CkJuYmcfAAACywh3u"

//const CHANNEL = "main"

//
const TOKEN_URL = 'http://localhost:3000/token';
//

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}




/*let joinAndDisplayLocalStream = async (roomId) => {

    
    client.on('user-published', handleUserJoined)
    
    client.on('user-left', handleUserLeft)
    

    
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, roomId)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks() 

    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)
    
    await client.publish([localTracks[0], localTracks[1]])
}

/*let joinStream = async () => {
    // meka mehemama thiyanna original eke comment ekk widiyatama
    await joinAndDisplayLocalStream()
    document.getElementById('join-btn').style.display = 'none'
    document.getElementById('stream-controls').style.display = 'flex'
    
}*/
/*let joinStream = async () => {
    const roomId = document.getElementById('room').value.toUpperCase(); // Get the room name from input field
    await joinAndDisplayLocalStream(roomId);
    document.getElementById('join-btn').style.display = 'none';
    document.getElementById('stream-controls').style.display = 'flex';
}*/

async function joinAndDisplayLocalStream(channelName, userId) {
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);
  
    const token = await fetch(TOKEN_URL, {
      method: 'GET',
      query: { channelName, userId }
    }).then(response => response.json());
  
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
  
    const player = `<div class="video-container" id="user-container-${userId}">
      <div class="video-player" id="user-${userId}"></div>
    </div>`;
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);
  
    localTracks[1].play(`user-${userId}`);
  
    await client.publish([localTracks[0], localTracks[1]], { channel: channelName });
  }
  
  async function joinStream() {
    const roomName = document.getElementById('room').value.toUpperCase();
    const userId = roomName; // Replace with your preferred identifier logic
    await joinAndDisplayLocalStream(`meeting_${roomName}`, userId);
    document.getElementById('join-btn').style.display = 'none';
    document.getElementById('stream-controls').style.display = 'flex';
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

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get("room");
console.log("Room ID:", roomId); 

if (roomId) {
    console.log("Joining room:", roomId); 
    joinAndDisplayLocalStream(roomId);
    document.getElementById("join-btn").style.display = "none";
    document.getElementById("stream-controls").style.display = "flex";
} else {
    console.log("No room ID found in URL."); 
}