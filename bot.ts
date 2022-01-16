import { command, CommandClient, CommandContext, event } from "./deps.ts";
import { parsedJoke, parsedQuote, parsedXkcd } from "./utils.ts";

export default class Pekusara extends CommandClient {
  constructor() {
    super({
      prefix: ["pk "],
      caseSensitive: false,
    });
  }

  @event()
  ready() {
    console.log(
      `Logged in as ${this.user?.tag}! ${JSON.stringify(Deno.version)}`,
    );
  }

  @command({ aliases: "pong" })
  Ping(ctx: CommandContext) {
    ctx.message.reply(`pong! ${ctx.client.gateway.ping}ms`);
  }

  @command()
  async Xkcd(ctx: CommandContext) {
    ctx.message.reply(await parsedXkcd());
  }

  @command()
  async quote(ctx: CommandContext) {
    ctx.message.reply(await parsedQuote());
  }

  @command()
  joke(ctx: CommandContext) {
    ctx.message.reply(parsedJoke());
  }
}
