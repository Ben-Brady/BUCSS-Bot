import { fetchEvents } from "../../discord/events";
import { type ApiRoute } from "../api";

export const eventRoute: ApiRoute = async () => {
    const events = await fetchEvents();
    return new Response(JSON.stringify(events));
};
