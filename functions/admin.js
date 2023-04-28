const { forceFileUpdate, refreshData, changePersonal, changeGroupOnly, changeWhitelist, addblacklist, removeblacklist, addwhitelist, removewhitelist,data } = require('./db.js');

const adminCommands = async (client, chat, message) => {
    const command = message.body.split(' ')[0].toLowerCase();
    if (command === '!admin') {
        message.react('👍');
        message.reply(
`🚧 *Opções de administrador disponíveis:*
*_!restrict_* - Altera a condição de uso da mensagem (pessoal/público)
*_!group_* - Altera a condição de respostas no privado
*_!quote_* - Envia ao *console* detalhes da mensagem marcada
*_!mediainfo_* - Envia no chat detalhes da mídia enviada
*_!quoteinfo_* - Envia no chat detalhes da mensagem marcada
*_!refresh_* - Recarrega os dados do arquivo JSON
*_!save_* - Força o salvamento do arquivo JSON
*_!whitelist_* - Ativa ou desativa o modo de whitelist (global)
*_!addblacklist_* - Adiciona o grupo a blacklist
*_!removeblacklist_* - Remove o grupo da blacklist
*_!addwhitelist_* - Adiciona o grupo a whitelist
*_!removewhitelist_* - Remove o grupo da whitelist
`
        );

    } else if (command === '!restrict') {
        await message.react('✅');
        changePersonal();
        message.reply(
            (data.personal)
                ? '❌ Bot ativado apenas para uso particular'
                : '✅ Bot aberto ao público'
        );

    } else if (command === '!group' || command === '!private') {
        await message.react('✅');
        changeGroupOnly();
        message.reply(
            (data.groupOnly)
                ? '❌ Bot ativado apenas para uso em grupos'
                : '✅ Bot aberto para uso no privado'
        );

    } else if (command === '!quote') {
        await message.react('✅');
        console.log(await message._data.quotedMsg);
        message.reply('✅ O objeto da mensagem marcada foi encaminhado ao console');

    } else if (command === '!mediainfo' && message.hasMedia) {
        const attachmentData = await message.downloadMedia();
        message.reply(
`*Media info*
MimeType: ${attachmentData.mimetype}
Filename: ${attachmentData.filename}
Data (length): ${attachmentData.data.length}`
        );

    } else if (command === '!quoteinfo' && message.hasQuotedMsg) {
        const quotedMsg = await message.getQuotedMessage();
        quotedMsg.reply(
`ID: ${quotedMsg.id._serialized}
Type: ${quotedMsg.type}
Author: ${quotedMsg.author || quotedMsg.from}
Timestamp: ${quotedMsg.timestamp}
Has Media? ${quotedMsg.hasMedia}`
        );
    } else if (command === '!refresh') {
        await message.react('✅');
        refreshData()
    } else if (command === '!save') {
        await message.react('✅');
        forceFileUpdate()
    } else if (command === '!whitelist') {
        changeWhitelist();
        message.reply(
            (data.whitelistMode)
                ? '✅ Whitelist Ativada'
                : '❌ Whitelist Desativada'
        );
    } else if (command === '!addblacklist') {
        await message.react('✅');
        addblacklist(chat.id.user);
    } else if (command === '!removeblacklist') {
        await message.react('✅');
        removeblacklist(chat.id.user);
    } else if (command === '!addwhitelist') {
        await message.react('✅');
        addwhitelist(chat.id.user);
    } else if (command === '!removewhitelist') {
        await message.react('✅');
        removewhitelist(chat.id.user);
    }
}

module.exports = {
    adminCommands: adminCommands,
}
