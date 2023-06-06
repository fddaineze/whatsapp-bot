const { updateCount, data } = require('./db.js');

const rollDice = async (client, msg) => {
    await msg.react('⌛');
    const expression = msg.body.substring(msg.body.indexOf(" ")).trim();

    let response = '🎲 *Dados:* \n';
    let total = 0;
    const diceRegex = /([\+\-])?\s*(\d+)d(\d+)/g;
    const diceMatches = expression.matchAll(diceRegex);

    for (const match of diceMatches) {
        const sign = match[1] || "+";
        const numDice = parseInt(match[2]);
        const numSides = parseInt(match[3]);

        for (let i = 0; i < numDice; i++) {
            const rollResult = Math.floor(Math.random() * numSides) + 1;

            if (rollResult == 1) response += "⛔ ";
            if (rollResult == numSides) response += "✨🎇 ";

            response += "d" + numSides + " = " + sign + rollResult + "\n";

            if (sign === '+') {
                total += rollResult;
            } else if (sign === '-') {
                total -= rollResult;
            }
        }
    }

    const modifierRegex = /([\+\-])\s*(\d+)(?![d])/g;
    const modifiers = Array.from(expression.matchAll(modifierRegex));

    if (modifiers.length > 0) {
        response += '\n🔢 *Modificadores:* \n';
        for (const modifier of modifiers) {
            const sign = modifier[1];
            const value = parseInt(modifier[2]);

            if (sign === '+') {
                response += ' + ' + value;
                total += value;
            } else if (sign === '-') {
                response += ' - ' + value;
                total -= value;
            }
        }
    }

    msg.reply("*Total:* " + total + "\n\n" + response);
    await msg.react('🎲');
}

module.exports = {
    rollDice: rollDice
}