const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');
const fs = require('fs');
const { data } = require('./db.js');

const generateAudio = async (chat, msg) => {
    await msg.react('⌛');

    let text = msg.body.slice(msg.body.indexOf(' ') + 1);
    const apiKey = data.elevenKey;
    const url = 'https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL'; // Bella ID

    try {
        const response = await axios.post(url, {
            text: text,
            model_id: 'eleven_multilingual_v1',
            voice_settings: {
                "stability": 0.75,
                "similarity_boost": 0.75
            }
        }, {
            headers: {
                'xi-api-key': apiKey,
                'accept': 'audio/mpeg',
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer'
        });

        const audioBuffer = Buffer.from(response.data, 'binary');
        fs.writeFileSync('output.mp3', audioBuffer);

        const voiceMessage = MessageMedia.fromFilePath('output.mp3');
        chat.sendMessage(voiceMessage, { sendAudioAsVoice: true });

        await msg.react('🎤');
    } catch (error) {
        await msg.react('❌');
        msg.reply("❌ Ocorreu um erro ao solicitar a síntese de fala");
        console.error('Ocorreu um erro ao solicitar a síntese de fala:', error);
    }
}

module.exports = {
    generateAudio: generateAudio
}