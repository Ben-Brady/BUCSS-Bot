import { startHttpApi } from "./api/api";
import { startDiscordBot } from "./discord/client";

startHttpApi();
startDiscordBot();
