import { joke, randomXkcd } from "./deps.ts";

export function parsedJoke() {
  const data = joke();
  return `${data.setup} ${data.punchline}`;
}

export async function parsedQuote() {
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json();
  return `${data.content} - ${data.author}`;
}

export async function parsedXkcd() {
  const comic = await randomXkcd();

  return `
**${comic.title}**
> ${comic.alt}
${comic.img}`;
}
