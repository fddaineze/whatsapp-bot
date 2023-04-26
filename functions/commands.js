const { generateSticker } = require('./stickers.js');
const { MessageMedia } = require('whatsapp-web.js')
const { props } = require('./admin.js');
const { updateCount, data } = require('./db.js');

const getInteraction = async (client, message) => {
    const sender = await message.getContact();
    const messageMentions = await message.getMentions();

    if (messageMentions.length == 0) return null;

    const contact = await client.getContactById(messageMentions[0].id._serialized);

    let mentions = [];
    mentions.push(contact);
    mentions.push(sender);

    const user = `@${sender.number}`;
    const mention = `@${messageMentions[0].id.user}`;

    return { mentions, user, mention }
}

const checkPremium = async (message) => {
    const contact = await message.getContact();
    return data.premiumUsers.includes(contact.id.user);
}

const basicCommands = async (client, chat, message) => {
    const args = message.body.split(' ');
    const command = args[0].toLowerCase();

    if (command === '!help' || command === '!comandos' || command === '!cmd') {
        updateCount('help');
        message.react('👍');
        message.reply(
            `🚧 *Opções disponíveis:*
*_!s_* - Cria um sticker da mídia ou link
*_!status_* - Mostra os status de uso e respostas no pv
*_!groupinfo_* - Mostra as principais informações do Grupo
*_!counter_* - Mostra quantas vezes cada comando foi usado
*_!amor_* - Veja em quanto está seu amor pela pessoa
*_!beijo_* - Bora dar um beijo em.. algum lugar?
*_!date_* - Vamos de date, bora sair com alguém
*_!passada_* - Passe a mão em... 🌚
*_!duelo_* - Desafie alguém para um duelo!
*_!mp3_* - Busca um mp3 no site myinstants.com"

✨ *Comandos Premium:*
*_!everyone_* - Menciona todos os membros do grupo!`
        );

    } else if (command === '!s') {
        updateCount('s');
        chat.sendStateTyping();
        const sender = message.from.includes(props.number) ? message.to : message.from;
        await generateSticker(client, message, sender);
        chat.clearState();
    } else if (command === '!status') {
        updateCount('status');
        await message.react('⌛');
        message.reply(
            `Uso: ${(props.personal) ? '❌ Bloqueado' : '✅ Liberado para uso'}
Privado: ${(props.groupOnly) ? '❌ Bloqueado' : '✅ Respondendo no privado'}`
        )
        message.react('✅');
    } else if (command === '!groupinfo') {
        updateCount('groupinfo');
        await message.react('⌛');
        if (chat.isGroup) {
            message.reply(
                `*Group Details*
Name: ${chat.name}
Description: ${chat.description}
Created At: ${chat.createdAt.toString()}
Created By: ${chat.owner.user}
Participant count: ${chat.participants.length}`
            );
        } else {
            message.reply('Este comando só pode ser utilizado em grupos.');
        }
        message.react('✅');
    } else if (command === '!everyone') {
        const premium = await checkPremium(message);
        if (premium) {
            updateCount('everyone');
            await message.react('⌛');
            let text = "⚠️ @all um comando de menção em massa foi utilizado!\n";
            let mentions = [];
            for (let participant of chat.participants) {
                const contact = await client.getContactById(participant.id._serialized);

                mentions.push(contact);
                text += `@${participant.id.user} `;
            }
            await chat.sendMessage(text, { mentions });
            message.react('');
        } else {
            message.reply('❌ Este comando está disponível somente para usuários premium');
            message.react('❌');
        }
    } else if (command === '!amor') {
        updateCount('amor');
        await message.react('⌛');
        const data = await getInteraction(client, message);
        if (data == null) {
            message.react('❌');
            message.reply('Você precisa marcar alguém');
        } else {
            chat.sendMessage(`💟 ${Math.floor(Math.random() * 101)}% de amor entre ${data.user} e ${data.mention} ♡`, { mentions: data.mentions });
            message.react('💟');
        }

    } else if (command === '!beijo') {
        updateCount('beijo');
        await message.react('⌛');
        const data = await getInteraction(client, message);
        if (data == null) {
            message.react('❌');
            message.reply('Você precisa marcar alguém');
        } else {
            const pick = ["a mão", "a testa", "a boca", "a bochecha", "a mãe", "a bunda", "o pai", "os pés", "se apaixonou traiu pediu desculpas e depois a mão"];
            const random = Math.floor(Math.random() * pick.length);
            chat.sendMessage(`🍑 ${data.user} beijou ${pick[random]} de ${data.mention}`, { mentions: data.mentions });
            message.react('🍑');
        }

    } else if (command === '!date') {
        updateCount('date');
        await message.react('⌛');
        const data = await getInteraction(client, message);
        if (data == null) {
            message.react('❌');
            message.reply('Você precisa marcar alguém');
        } else {
            const pick = ['na cama', 'no bar', 'no cinema', 'no matinho', 'no motel', 'aqui no grupo'];
            const random = Math.floor(Math.random() * pick.length);
            chat.sendMessage(`🥂 ${data.user} marcou um date com ${data.mention} ${pick[random]}`, { mentions: data.mentions });
            message.react('🥂');
        }

    } else if (command === '!passada') {
        updateCount('passada');
        await message.react('⌛');
        const data = await getInteraction(client, message);
        if (data == null) {
            message.react('❌');
            message.reply('Você precisa marcar alguém');
        } else {
            const pick = ['na bunda', 'no piru'];
            const random = Math.floor(Math.random() * pick.length);
            chat.sendMessage(`🖐 ${data.user} passou a mão ${pick[random]} de ${data.mention}`, { mentions: data.mentions });
            message.react('🖐');
        }

    } else if (command === '!duelo') {
        updateCount('duelo');
        await message.react('⌛');
        const data = await getInteraction(client, message);
        if (data == null) {
            message.react('❌');
            message.reply('Você precisa marcar alguém');
        } else {

            setTimeout(() => { message.react('⚔') }, 500);
            setTimeout(() => { message.react('👊') }, 1000);
            setTimeout(() => { message.react('🧨') }, 1500);
            setTimeout(() => { message.react('✨') }, 2000);
            setTimeout(() => { message.react('🔪') }, 2500);
            setTimeout(() => { message.react('🏹') }, 3000);
            setTimeout(() => { message.react('💣') }, 3500);
            setTimeout(() => { message.react('🔥') }, 4000);
            setTimeout(() => { message.react('‼') }, 4500);

            setTimeout(async () => {
                await message.react('⌛');
                const winpick = ['desceu o sarrafo em', 'baixou o cacete em', 'deu com o pau na cara de', 'meteu a porrada em', 'esfregou no asfalto a cara de'];
                const winrandom = Math.floor(Math.random() * winpick.length);

                const losepick = ['apanhou mais que tapete no varal de', 'apanhou mais que fusca em ladeira de', 'apanhou mais que piñata em festa de aniversário de', 'apanhou mais que a bunda da sua tia de'];
                const loserandom = Math.floor(Math.random() * losepick.length);

                const win = Math.round(Math.random());
                const result = `🎯 ${data.user} ${(win) ? winpick[winrandom] : losepick[loserandom]} ${data.mention}`;

                chat.sendMessage(result, { mentions: data.mentions });
                message.react('🎯');
            }, 5000);
        }
    } else if (command === '!counter') {
        await message.react('⌛');
        let sentence = "⚠️ *Contador de uso:*\n \n";
        for (const prop in data.cmdCounter) {
            sentence = `${sentence} ${data.cmdCounter[prop]}x *_${prop}_*\n`
        }
        message.reply(sentence);
        message.react('🔢');
    }
}

module.exports = {
    basicCommands: basicCommands
}

//⚠️✅❌⌛
