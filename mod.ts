import { GatewayIntents } from "./deps.ts";
import Pekusara from "./bot.ts";

let token = Deno.env.get("token");

if (Deno.env.get("env") !== "production") {
  const { config } = await import("https://deno.land/x/dotenv@v3.1.0/mod.ts");
  const data = config();
  token = data.token;
}

new Pekusara().connect(token, [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);
