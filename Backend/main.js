const APP_ID = "352d6ad86462494d904afc4cfeeda64b"
const TOKEN = "007eJxTYMiQVNv9tu/yuvMBq1InpXpP+mnKKCn2ObfzsvJ2q0SfwEwFBmNToxSzxBQLMxMzIxNLkxRLA5PEtGST5LTU1JREM5MkfaFrqQ2BjAxbmrcyMzJAIIjPwpCbmJnHwAAAKI4fGQ=="
const CHANNEL = "main"
const uid = String(Math.floor(Math.random() * 232))

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

let localTracks = []
let remoteUsers = {}


let initialRTM = async () => {
    let client = await AgoraRTM.createInstance(APP_ID)
    await client.login({token: TOKEN, uid: uid}) // login firstly

    const CHANNEL=await client.creatChannel("main") // create a channel
    await CHANNEL.join() // join the channel

    let form = document.getElementById('message__form')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        let message = e.target.message.value
        await CHANNEL.sendMessage({text: message, sender: uid})

        form.reset()

        document.getElementById('message').value = ''
        let messageObj = {
            text: message,
            sender: uid
        }
        await CHANNEL.sendMessage({text: JSON.stringify(messageObj)})
    })


    CHANNEL.on('ChannelMessage', async (message, senderId) => {
        console.log('Message Received: ', message)
    })
}

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
