import dotenv from 'dotenv';
dotenv.config();

// Require the necessary discord.js classes
import { Client, GatewayIntentBits, Message } from 'discord.js';
const TOKEN = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages
  ]
});

client.on('ready', () => {
  if (TOKEN && TOKEN?.length > 0) {
    console.log("I'm Ready to start!");
  }
});

client.once('ready', (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on('messageCreate', (message: Message) => {
  console.log(`Received message: ${message.content}`);
  if (message.author.bot) return;
  if (message.content === 'holi') {
    console.log('Responding to "holi" message');
    message.channel.send('**HOLI GOLI**');
    return;
  }
});

client.on('error', (error) => {
  console.error('Error occurred:', error);
});

client.login(TOKEN);
