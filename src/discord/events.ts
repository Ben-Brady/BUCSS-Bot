import { client } from "./client";
import { SERVER_ID } from "../config";

type BUCSSEvent = {
    title: string;
    summary: string;
    date?: Date;
    location: string;
    link?: string;
};

let cachedValue: BUCSSEvent[] | undefined = undefined;
let CACHE_TIMEOUT = 1000 * 60;

export const fetchEvents = async (): Promise<BUCSSEvent[]> => {
    if (cachedValue) return cachedValue;
    if (!client) return [];

    const server = await client.guilds.fetch(SERVER_ID);
    const discordEvents = await server.scheduledEvents.fetch();

    const events = discordEvents.map<BUCSSEvent>(event => ({
        title: event.name,
        summary: event.description ?? "",
        date: event.scheduledStartAt ?? undefined,
        location: event.entityMetadata?.location ?? "",
        link: event.url,
    }));

    cachedValue = events;
    setTimeout(() => {
        cachedValue = undefined;
    }, CACHE_TIMEOUT);

    return events;
};
