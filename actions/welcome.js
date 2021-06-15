module.exports = bot => {
    //initializing Discord-User Julian Texo(BotAdmin) for dms on new server members
    const JT = '260497864277491712';
    //handling for new member on the server.
    bot.on('guildMemberAdd', (member) => {
      //sending a welcome message to the user
      member.send("Welcome to the Little Nightmares Speedrunners Discord! \n Whenever you have a question feel free to ask! We are here to help. \n Don't forget to grab your role in the #roles channel. \n Do not insult anyone and be nice. \n Happy running!");
      //sending a notification to the bot admin that a new member joined the server.
      member.guild.members.cache.get(JT).send("There is a new member on the server: " + member.user.username);
    })
  }