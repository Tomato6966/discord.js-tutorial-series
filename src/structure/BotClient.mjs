import { Client, GatewayIntentBits, Options } from "discord.js";
import { defaultEnvData } from "../data/DefaultEnvData.mjs";

export default class BotClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ],
            makeCache: Options.cacheWithLimits({
                ApplicationCommandManager: {
                    maxSize: -1
                },
                GuildInviteManager: {
                    maxSize: -1
                },
                GuildStickerManager: {
                    maxSize: -1
                },
                ReactionManager: {
                    maxSize: -1
                },
                PresenceManager: {
                    maxSize: -1,
                },
                MessageManager: {
                    maxSize: -1
                }
            })
        });

        this.envConfig = {
            discordToken: process.env.DISCORD_TOKEN,
            prefix: process.env.PREFIX,
        };

        this.init();
    }
    async init() {
        await this.ensureEnvVars();
        this.login(this.envConfig.DiscordToken)
    }
    async ensureEnvVars() {
        if(this.envConfig.discordToken.length < 10) throw new SyntaxError("No valid Discod Provided");
        for(const [key, values] of Object.entries(defaultEnvData)) {
            if(!this.envConfig[key]?.length) this.envConfig[key] = values;
        }
    }
}