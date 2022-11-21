await import("dotenv").then(i => i.config());

import BotClient from "./structure/BotClient.mjs";
const client = new BotClient();

client.on("ready", () => {
    console.log(client.envConfig);
    console.log(`Bot is ready and it's name is ${client.user.tag}`);
})

client.on("messageCreate", (message) => {
    if(!message.guildId || message.author.bot) return;
    const { content } = message;
    
    if(!content.trim().startsWith(client.envConfig.prefix)) return;
    // !ping asd --> ["!ping", "asd"]
    const [cmd, ...args] = content.trim().slice(client.envConfig.prefix.length).split(/ +/g);
    const cmdName = cmd?.toLowerCase?.();
    if(!cmd) return;
    if(cmd == "ping") {
        message.reply({
            content: "Pong!"
        });
    }
})