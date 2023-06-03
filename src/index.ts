import { Elysia } from "elysia";
import { prisma } from "./lib/prisma";

const app = new Elysia()
  .use((app) => app.state("prisma", prisma))
  .get("/", async ({ store }) => {
    return "Hello";
  })
  .listen(8080);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
