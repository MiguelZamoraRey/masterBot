import { Client, Message, GatewayIntentBits } from 'discord.js';
const dotenv = require('dotenv');
dotenv.config();

const TOKEN = process.env.DISCORD_TOKEN;

// Crea una instancia del cliente de Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define el prefijo para los comandos, en este caso, no usaremos prefijo
const prefix = '';

// Cuando el bot esté listo, imprime un mensaje en la consola
client.once('ready', () => {
  if (TOKEN && TOKEN?.length > 0) {
    console.log('Bot listo!');
  } else {
    console.log('Bot sin token!');
  }
});

// Escucha los mensajes
client.on('message', (message: Message) => {
  // Ignora los mensajes del bot
  if (message.author.bot) return;

  console.log('Mensaje recibido:', message.content);
  // Si el mensaje es "holi"
  if (message.content.toLowerCase() === 'holi') {
    // Envía "holi goli" como respuesta
    message.channel.send('holi goli');
  }
});

// Autentica el bot con el token proporcionado por Discord Developer Portal
client.login(TOKEN).catch(console.error);
