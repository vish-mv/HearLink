let sendMessage = async (massege) => {

    massege.preventDefault()

    let message = massege.target.massege.value
    CHANNEL.sendMessage({text:JSON.stringify({'type':'chat','message':message,'displayName':displayName})})
    
    message.target.reset()


}

let handleUserMessage = async (messageData, UserId) => {
    console.log('a message was recieved')
    let data = JSON.parse(messageData.text)

    console.log('Message:', data)
}

let messagForm = document.getElementById('message__form')
messagForm.addEventListener('submit',sendMessage)