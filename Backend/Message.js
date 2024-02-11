let sendMessage = async (massege) => {

    massege.preventDefault()

    let message = massege.target.massege.value
    CHANNEL.sendMessage({text:JSON.stringify({'type':'chat','message':message,'displayName':displayName})})
    
    message.target.reset()


}