const { MessageMedia, Util } = require('whatsapp-web.js')
const axios = require('axios');

const generateSticker = async (client, msg, sender) => {
    await msg.react('⌛');
    let mediaMsg = msg;
    if (msg.hasQuotedMsg && (msg._data.quotedMsg.type === 'image' || msg._data.quotedMsg.type === 'video')) {
        mediaMsg = await msg.getQuotedMessage();
    }
    if (mediaMsg.type === "image" || mediaMsg.type === "video") {
        try {
            const { data } = await mediaMsg.downloadMedia();

            if (mediaMsg.type === "video") {
                msg.reply("❌ A criação de sticks animados ainda não foi finalizada");
                // const video = await new MessageMedia("video/mp4", data, "video.mp4");
                // const sticker = await Util.formatVideoToWebpSticker(video);
                // const sticker = await createSticker(video, { author: 'Your Name' });
                // await msg.reply(sender, video, { sendMediaAsSticker: true });

            } else {
                const image = await new MessageMedia("image/jpeg", data, "image.jpg");
                await client.sendMessage(sender, image, { sendMediaAsSticker: true, stickerAuthor: "Daineze.bot", stickerName: "Sticker" });
                await msg.react('');
            }
        } catch (e) {
            msg.reply("❌ Erro ao processar imagem");
        }
    } else {
        try {
            const url = mediaMsg.body.substring(mediaMsg.body.indexOf(" ")).trim();
            if (url == "" || url == null || url == undefined) {
                msg.reply("❌ Envie ou marque uma mídia válida, ou então, use um link da mídia junto ao comando");
            } else {
                const { data } = await axios.get(url, { responseType: 'arraybuffer' });
                const returnedB64 = Buffer.from(data).toString('base64');
                const image = await new MessageMedia("image/jpeg", returnedB64, "image.jpg");
                await client.sendMessage(sender, image, { sendMediaAsSticker: true });
            }
        } catch (e) {
            msg.reply("❌ Não foi possível gerar um sticker com esse link");
        }
    }
}

module.exports = {
    generateSticker: generateSticker
}
