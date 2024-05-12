import { Client, Message, GatewayIntentBits } from 'discord.js';
const dotenv = require('dotenv');
dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//const prefix = '';

client.once('ready', () => {
  if (TOKEN && TOKEN?.length > 0) {
    console.log('Bot listo!');
  } else {
    console.log('Bot sin token!');
  }
});

client.on('message', (message: Message) => {
  if (message.author.bot) return;
  console.log('Mensaje recibido:', message.content);
  if (message.content.toLowerCase() === 'holi') {
    message.channel.send('holi goli');
  }
});

client.login(TOKEN).catch((err) => {
  console.log('ERROR: ', err);
  console.log('ERROR (message): ', err.message);
  console.error;
});
