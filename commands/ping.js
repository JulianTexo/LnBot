module.exports = {
    //initializing the ping module
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args){
        message.channel.send("I'm here!");
    }
}