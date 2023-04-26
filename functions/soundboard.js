const { MessageMedia } = require('whatsapp-web.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const sendAudio = async (chat, link) => {
    media = await MessageMedia.fromUrl(link, { unsafeMime: true });
    chat.sendMessage(media, { sendAudioAsVoice: true });
}

const searchAudio = async (chat, message, searchTerm) => {
    try {
        // code by TheIago
        const url = `https://www.myinstants.com/pt/search/?name=${searchTerm}`;
        const dom = await JSDOM.fromURL(url, {features: { QuerySelector: true}});
        const document = dom.window.document;
        
        firstButton = document.querySelector(".small-button").getAttribute('onClick');
        const firstQuote = firstButton.indexOf("'");
        const lastQuote = firstButton.indexOf("'", firstQuote + 1);
        const link = firstButton.substring(firstQuote + 1, lastQuote);

        const media = await MessageMedia.fromUrl(`https://www.myinstants.com${link}`);
        chat.sendMessage(media, { sendAudioAsVoice: true });
        await message.react('🔊');
        // end code by TheIago
    } catch (e) {
        message.reply("❌ Audio não encontrado");
        await message.react('❌');
    }
}

const soundBoard = async (client, chat, message) => {
    const args = message.body.split(' ');
    const command = args[0].toLowerCase();

    if (command === '!uwu') {
        await message.react('⌛');
        sendAudio(chat, "https://www.myinstants.com/media/sounds/youtube-uwuuuuu.mp3")
        message.react('');
    }
    if (command === "!mp3") {
        let search = args;
        search.shift();
        if(search == "") {
            message.reply("❌ Você precisa escrever o termo da pesquisa");
            await message.react('❌');
        } else {
            search = search.toString().replace(',','+');
            await searchAudio(chat, message, search);
        }
    }
}

module.exports = {
    soundBoard: soundBoard
}
