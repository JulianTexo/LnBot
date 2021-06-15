//initializing all needed modules
const discord = require('discord.js');
require('dotenv').config();
const fetch = require("node-fetch");
const fs = require('fs');

//initializing all channels the bot interacts with
const commandsChannel = '838745116420210729';
const logChannel = '841083910401556490';

//setting the prefix that leads all commands
const prefix = '!';

//initializing the welcome-message module
const welcome = require('./actions/welcome');

//initializing the Discord-Client for the bot
const bot = new discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
bot.commands = new discord.Collection();

//get all command-modules
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

//message handling (command handling)
bot.on('message', (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == 'ping'){
        bot.commands.get('ping').execute(message, args);
    }
    if(command == 'reactionrole'){
        bot.commands.get('reactionrole').execute(message, args, discord, bot);
    }    
});

//setup after bot (re)start
bot.on('ready', () => {
  console.log('LnBot is online!');
  bot.channels.cache.get(logChannel).send("Registering Reaction Listeners...").then(sent => {
    bot.commands.get('reactionrole').execute(sent, ["registerer"], discord, bot);
  });
  welcome(bot);
});

//logging into the Discord api
bot.login(process.env.BOT_TOKEN);