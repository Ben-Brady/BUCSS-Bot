import type { EventCallback } from "discopic";
import { publishMessage } from "../api";
import { ActivityType } from "discord.js";

export const on_ready: EventCallback<"on_ready"> = async client => {
    client.user.setActivity({
        name: "your screams",
        type: ActivityType.Listening,
    });
};
