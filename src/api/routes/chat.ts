import { server, type ApiRoute } from "../api";

export const wsChatRoute: ApiRoute = async (server, req) => {
    if (server.upgrade(req)) return;
    return new Response("Upgrade Failed :(", { status: 400 });
};

export const publishMessage = (message: ImageMessage | ChatMessage) => {
    if (!server) return;
    server.publish("chat", JSON.stringify(message));
};

type ImageMessage = {
    type: "image";
    id: string;
    link: string;
};

type ChatMessage = {
    type: "chat";
    id: string;
    name: string;
    text: string;
    pfp: string;
};
