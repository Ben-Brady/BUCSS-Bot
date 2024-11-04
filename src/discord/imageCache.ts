import type { Client } from "discord.js";
import { CACHE_CHANNEL_ID } from "../config";

const cache = new Map<string, string>();

export const cacheImage = async (client: Client, filepath: string): Promise<string> => {
    const cachedUrl = cache.get(filepath);
    if (cachedUrl) return cachedUrl;

    const channel = await client.channels.fetch(CACHE_CHANNEL_ID);
    if (!channel) throw new Error("Cache Channel doesn't exist");
    if (!channel.isSendable()) throw new Error("Cache Channel isn't sendable");
    const message = await channel.send({ files: [filepath] });
    const fileUrl = message.attachments.at(0)?.url;
    if (!fileUrl) throw new Error(`${filepath} not succesfully uploaded`);

    cache.set(filepath, fileUrl);
    return fileUrl;
};
