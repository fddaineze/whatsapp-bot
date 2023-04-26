const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const { adminCommands, props } = require('./functions/admin.js');
const { basicCommands } = require('./functions/commands.js');
const { events } = require('./functions/events.js');
const { soundBoard } = require('./functions/soundboard.js');

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "default-client" })
});

client.on('loading_screen', (percent, message) => {
    console.log('- Loading:', percent, message);
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('- Authenticated.');
});

client.on('ready', () => {
    console.log('- Client is ready!');
});

client.on('message_create', async message => {
    if (message.body.startsWith('!')) {
        let chat = await message.getChat();
        if (message.fromMe) {
            adminCommands(client, chat, message);
        }
        if ((props.personal && !message.fromMe) || (props.groupOnly && !chat.isGroup)) {
            // com o "props.personal" ativado, o bot funciona apenas para o host
            // com o "props.groupOnly" ativado, o bot não funciona no privado
        } else {
            basicCommands(client, chat, message);
            soundBoard(client, chat, message);
        }
    }
});

client.initialize();
events(client);
