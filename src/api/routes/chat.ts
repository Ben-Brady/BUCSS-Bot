import { server, type ApiRoute } from "../api";

let recentMessages: Message[] = [];

export const recentMessagesRoute: ApiRoute = async (server, req) => {
    return new Response(JSON.stringify(recentMessages.reverse()), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
};

const MAX_LENGTH = 50;

export const publishMessage = (message: Message) => {
    if (recentMessages.length > MAX_LENGTH) {
        recentMessages = recentMessages.slice(1, 0);
    }
    recentMessages.push(message);
};

export type Message = ImageMessage | ChatMessage;

export type ImageMessage = {
    type: "image";
    imageUrl: string;

    id: string;
    createdAt: Date;
    username: string;
    pfpUrl: string;
};

export type ChatMessage = {
    type: "chat";
    message: string;

    id: string;
    createdAt: Date;
    username: string;
    pfpUrl: string;
};
