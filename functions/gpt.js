const { GPT4All } = require("../ai/gpt4all");

const searchgpt = async (_, chat, message) => {
  try {
    const gpt4all = new GPT4All('gpt4all-lora-unfiltered-quantized');
    await gpt4all.init();
    await gpt4all.open();

    const args = message.body.split(" ");
    const command = args[0].toLowerCase();
    if (command === "!gpt") {
      let search = args;
      search.shift();

      if (search == "") {
        message.reply("❌ Você precisa escrever o termo da pesquisa");
        await message.react("❌");
      } else {
        message.react("⌛");
        search = search.join(" ");
        const response = await gpt4all.prompt(search);
        chat.sendMessage(response.replace(/\x1b\[\d+m/g, ""));
      }
    }

    gpt4all.close();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  gpt: searchgpt,
};
