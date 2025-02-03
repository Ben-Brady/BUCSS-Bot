import type { EventCallback } from "discopic";
import { publishMessage } from "../../api/routes/chat";

export const on_message: EventCallback<"on_message"> = async msg => {
    if (msg.author.bot) return;

    const images = msg.attachments.map(attachment => attachment.url);

    const id = msg.id.toString();
    const createdAt = msg.createdAt;
    const username = msg.author.displayName;
    const pfpUrl = msg.author.avatarURL({ forceStatic: true }) ?? "";

    if (images.length === 0) {
        const message = msg.cleanContent.toString();
        publishMessage({ type: "chat", id, createdAt, message, username, pfpUrl });
    } else {
        for (const image of images) {
            publishMessage({ type: "image", id, createdAt, pfpUrl, username, imageUrl: image });
        }
    }
};
