const VkBot = require('node-vk-bot-api');
const { TOKEN, GROUP_ID } = require('./secret');
const { botName, IS_DEBUG } = require('./config');

const skillList = require('./skills/skillList');


const bot = new VkBot({
    token: TOKEN,
    group_id: GROUP_ID,
})

bot.on((ctx) => {
    const { message } = ctx;
    const regBotName = new RegExp(botName, 'i');
    if (!regBotName.test(message.text)){
        return;
    }

    for (const callName in skillList) {
        if (skillList.hasOwnProperty(callName)) {
            const regCallName = new RegExp(callName, 'i');
            if (regCallName.test(message.text)){
                IS_DEBUG && console.log(`match: ${callName}`);
                skillList[callName](message, bot, GROUP_ID);
                return;
            }
        }
    }

})

bot.startPolling()