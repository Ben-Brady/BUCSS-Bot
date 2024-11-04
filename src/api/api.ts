import type { Server } from "bun";
import { wsChatRoute } from "./routes/chat";
import { eventRoute } from "./routes/events";

export let server: Server | undefined = undefined;

export type ApiRoute = (server: Server, req: Request) => Promise<void | Response>;

const routes: Record<string, ApiRoute> = {
    "/ws/chat": wsChatRoute,
    "/events": eventRoute,
};

export const startHttpApi = () => {
    server = Bun.serve({
        id: "http",
        port: 3000,
        fetch(request, server) {
            const url = new URL(request.url);
            const apiRoute = routes[url.pathname];
            if (!apiRoute) return new Response("Not Found", { status: 404 });

            return apiRoute(server, request);
        },
        websocket: {
            open: ws => ws.subscribe("chat"),
            close: ws => ws.unsubscribe("chat"),
            message: ws => ws.close(1000),
        },
    });

    console.log(`Serving API on ${server.url}`);
};
