import { ActionRowBuilder } from "@discordjs/builders";
import { createCommand, type CommandContext } from "discopic";
import type {
    CommandInteraction,
    InteractionEditReplyOptions,
    InteractionReplyOptions,
    MessageActionRowComponentBuilder,
} from "discord.js";
import { cacheImage } from "../imageCache";

type Page = {
    name: string;
    description: string;
    cost: string;
    stock: number;
    image: string;
};

const MessageActionRow = ActionRowBuilder<MessageActionRowComponentBuilder>;
type MessageActionRow = ActionRowBuilder<MessageActionRowComponentBuilder>;

const pages: Page[] = [
    {
        name: "Programming Socks",
        description: "These programming socks will make you the talk of the town!",
        cost: "£3.50",
        stock: 1,
        image: "./src/assets/socks.png",
    },
    {
        name: "BUCSS Hat",
        description: "This fancy hat",
        cost: "£3.50",
        stock: 1,
        image: "./src/assets/socks.png",
    },
];

const renderPage = async (
    cmdCtx: CommandContext,
    cmdInteraction: CommandInteraction,
    page: Page,
): Promise<InteractionReplyOptions & InteractionEditReplyOptions> => {
    const dropDown = cmdCtx.createStringSelection({
        options: pages.map(v => ({ label: v.name, value: v.name })),
        default: page.name,
        onSelect: async ({ selected, interaction }) => {
            const selection = selected[0];
            const page = pages.find(v => v.name === selection)!;

            const options = await renderPage(cmdCtx, cmdInteraction, page);
            await cmdInteraction.editReply(options);
            interaction.deferReply().then(() => interaction.deleteReply());
        },
    });

    const { name, cost, stock, description, image } = page;
    const imageUrl = await cacheImage(cmdInteraction.client, image);
    return {
        content: `## ${name} - ${cost}\n` + `${stock} remaining, ${description}\n${imageUrl}`,
        ephemeral: true,
        components: [new MessageActionRow({ components: [dropDown.toJSON()] })],
    };
};

export const shopCommand = createCommand({
    name: "shop",
    description: "View our available merch",
    async execute({ ctx, interaction }) {
        const options = await renderPage(ctx, interaction, pages[0]);
        interaction.reply(options);
    },
});
