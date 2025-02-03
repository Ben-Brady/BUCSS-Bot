import type { Server } from "bun";
import { recentMessagesRoute } from "./routes/chat";
import { eventRoute } from "./routes/events";

export let server: Server | undefined = undefined;

export type ApiRoute = (server: Server, req: Request) => Promise<Response>;

const routes: Record<string, ApiRoute> = {
    "/messages/recent": recentMessagesRoute,
    "/events": eventRoute,
};

export const startHttpApi = () => {
    server = Bun.serve({
        id: "http",
        port: 3000,
        async fetch(request, server) {
            const url = new URL(request.url);
            const apiRoute = routes[url.pathname];
            if (!apiRoute) return new Response("Not Found", { status: 404 });

            const response = await apiRoute(server, request);
            response.headers.set("Access-Control-Allow-Headers", "*");
            response.headers.set("Access-Control-Allow-Methods", "*");
            response.headers.set("Access-Control-Allow-Origin", "*");
            return response;
        },
    });

    console.log(`Serving API on ${server.url}`);
};
