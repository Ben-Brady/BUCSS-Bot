import { createBot } from "discopic";
import { on_message } from "./events/on_message";
import { on_ready } from "./events/on_ready";
import type { Client } from "discord.js";

export let client: Client | undefined = undefined;

export const startDiscordBot = () => {
    const bot = createBot({
        intents: ["guild_messages", "message_content", "guilds"],
        events: { on_message, on_ready },
        commands: [],
    });
    client = bot.client;
    bot.start();
};
