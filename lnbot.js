const discord = require('discord.js');
require('dotenv').config();

const fetch = require("node-fetch");

const commandsChannel = '838745116420210729';
const logChannel = '841083910401556490';

const prefix = '!';

const fs = require('fs');

const welcome = require('./actions/welcome');

const bot = new discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
bot.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

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

bot.on('ready', () => {
  console.log('LnBot is online!');
  bot.channels.cache.get(logChannel).send("Registering Reaction Listeners...").then(sent => {
    bot.commands.get('reactionrole').execute(sent, ["registerer"], discord, bot);
  });
  welcome(bot);
});

bot.login(process.env.BOT_TOKEN);