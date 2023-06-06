const fs = require('fs');
const path = require('path');
const { SpeechClient } = require('@google-cloud/speech');
const { MessageMedia } = require('whatsapp-web.js');

const { execSync } = require('child_process');

const convertMP3ToWAV = async (inputFile, outputFile) => {
    try {
        execSync(`ffmpeg -i ${inputFile} ${outputFile} -loglevel quiet`);
    } catch (error) {
        console.error('Erro na conversão de MP3 para WAV:', error);
    }
};

const audioSpeech = async (chat, msg) => {
    await msg.react('⌛');

    // Configure a autenticação do google 
    const auth = path.join(__dirname, '../data-auth.json');
    process.env.GOOGLE_APPLICATION_CREDENTIALS = auth;

    if (msg.hasQuotedMsg && (msg._data.quotedMsg.type === 'audio' || msg._data.quotedMsg.type === 'ptt')) {
        mediaMsg = await msg.getQuotedMessage();
        // Baixa a mensagem
        const mediaData = await mediaMsg.downloadMedia();
        // Gera um nome de arquivo único com a extensão .mp3
        const fileName = Date.now();
        // Define o caminho completo do arquivo de áudio
        const fileMp3 = path.join(__dirname, `${fileName}.mp3`);
        const fileWav = path.join(__dirname, `${fileName}.wav`);
        // Salva o áudio no arquivo local
        fs.writeFileSync(fileMp3, mediaData.data, { encoding: 'base64' });
        // Configure o arquivo de áudio que você deseja transcrever
        convertMP3ToWAV(fileMp3, fileWav);
        const audioFile = fileWav;

        // Crie uma instância do cliente de reconhecimento de fala
        const speechClient = new SpeechClient();

        // Configure as opções de reconhecimento de fala
        const config = {
            encoding: 'WAV',
            sampleRateHertz: (mediaMsg.type == 'audio') ? 44100 : 48000,
            languageCode: 'pt-BR',
        };

        // Crie uma solicitação de transcrição
        const request = {
            audio: {
                content: fs.readFileSync(audioFile).toString('base64'),
            },
            config: config,
        };

        // Faça a solicitação de transcrição
        speechClient.recognize(request)
            .then(data => {
                const transcription = data[0].results
                    .map(result => result.alternatives[0].transcript)
                    .join('\n');
                msg.reply("🎧 " + transcription);
                msg.react('🎧');

                // Apaga os arquivos MP3 e WAV após a transcrição
                fs.unlinkSync(fileMp3);
                fs.unlinkSync(fileWav);
            })
            .catch(err => {
                console.error('Erro na transcrição: ', err);
                msg.reply("❌ Ocorreu um erro ao solicitar a síntese de fala");
                msg.react('❌');
                if (fs.existsSync(fileMp3)) fs.unlinkSync(fileMp3);
                if (fs.existsSync(fileWav)) fs.unlinkSync(fileWav);
            });
    } else {
        msg.reply("❌ A mensagem marcada não é um audio");
        msg.react('❌');
    }
}

module.exports = {
    audioSpeech: audioSpeech
}