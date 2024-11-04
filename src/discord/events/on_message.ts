import type { EventCallback } from "discopic";
import { publishMessage } from "../../api/routes/chat";

export const on_message: EventCallback<"on_message"> = async message => {
    if (message.author.bot) return;

    const images = message.attachments.map(attachment => attachment.url);

    if (images.length === 0) {
        publishMessage({
            id: message.id.toString(),
            type: "chat",
            text: message.content,
            name: message.author.displayName,
            pfp:
                message.author.avatarURL({
                    forceStatic: true,
                }) ?? "",
        });
    } else {
        images.map(link => {
            publishMessage({
                id: message.id.toString(),
                type: "image",
                link: link,
            });
        });
    }
};
