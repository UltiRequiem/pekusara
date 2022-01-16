import {
  command,
  CommandClient,
  CommandContext,
  event,
  GatewayIntents,
  joke,
  randomXkcd,
} from "./deps.ts";

let token = Deno.env.get("token");

if (Deno.env.get("env") !== "production") {
  const { config } = await import("https://deno.land/x/dotenv@v3.1.0/mod.ts");
  const data = config();
  token = data.token;
}

class Pekusara extends CommandClient {
  constructor() {
    super({
      prefix: ["pk ", "diah "],
      caseSensitive: false,
    });
  }

  @event()
  ready() {
    console.log(`Logged in as ${this.user?.tag}! ${Deno.version}`);
  }

  @command({ aliases: "pong" })
  Ping(ctx: CommandContext) {
    ctx.message.reply(`pong! ${ctx.client.gateway.ping}ms`);
  }

  @command()
  async Xkcd(ctx: CommandContext) {
    const comic = await randomXkcd();

    const message = `
**${comic.title}**
> ${comic.alt}
${comic.img}`;

    ctx.message.reply(message);
  }

  @command()
  async quote(ctx: CommandContext) {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    ctx.message.reply(data.content);
  }

  @command()
  joke(ctx: CommandContext) {
    const data = joke();
    ctx.message.reply(`${data.setup} ${data.punchline}`);
  }

  @command()
  async dadjoke(ctx: CommandContext) {
    const response = await fetch("https://icanhazdadjoke.com", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    const data = response.json();
    ctx.message.reply(JSON.stringify(data));
  }
}

new Pekusara().connect(token, [
  GatewayIntents.DIRECT_MESSAGES,
  GatewayIntents.GUILDS,
  GatewayIntents.GUILD_MESSAGES,
]);
