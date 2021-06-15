module.exports = {
  //initializing the reactionrole module
    name: 'reactionrole',
    descritpion: "Sets up a reaction role message!",
    async execute(message, args, Discord, bot) {
      //initializing arguments, channels, roles and emojis
      const rereg = (args[0] === "registerer");
      const channel = '838745116420210729';
      const Ln1Role = message.guild.roles.cache.find(role => role.name === "LN1");
      const Ln2Role = message.guild.roles.cache.find(role => role.name === "LN2");
      const VlnRole = message.guild.roles.cache.find(role => role.name === "VLN");
  
      const Ln1Emoji = '1️⃣';
      const Ln2Emoji = '2️⃣';
      const VlnEmoji = '0️⃣';

  //handling for bot restarts
  if(!rereg){
      let embed = new Discord.MessageEmbed()
        .setColor('#ffff00')
        .setTitle('Choose the role of the game you run!')
        .setDescription(`${Ln1Emoji} for Little Nightmares 1 role\n` +
          `${Ln2Emoji} for Little Nightmares 2 role\n${VlnEmoji} for Very Little Nightmares role.`);    
      let messageEmbed = await message.channel.send(embed);
      messageEmbed.react(Ln1Emoji);
      messageEmbed.react(Ln2Emoji);
      messageEmbed.react(VlnEmoji);
  }
  
      //adding the role on reactions being added to the message
      bot.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === Ln1Emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(Ln1Role);
          }
          if (reaction.emoji.name === Ln2Emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(Ln2Role);
          }
          if(reaction.emoji.name === VlnEmoji){
            await reaction.message.guild.members.cache.get(user.id).role.add(VlnRole);
          }
        } else {
          return;
        }
      });
  
      //removing the role on reactions being removed from the message
      bot.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.channel.id == channel) {
          if (reaction.emoji.name === Ln1Emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(Ln1Role);
          }
          if (reaction.emoji.name === Ln2Emoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(Ln2Role);
          }
          if(reaction.emoji.name === VlnRole){
            await reaction.message.guild.members.cache.get(user.id).roles.remove(VlnRole);
          }
        } else {
          return;
        }
      });
    }
  
  
  }