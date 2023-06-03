import Elysia from "elysia";
import { prisma } from "./lib/prisma";
import { auth } from "./modules";
const prismaPlugin = (app: Elysia) => app.state("prisma", prisma);

const app = new Elysia()
  .use(prismaPlugin)
  .group("/api", (app) => app.use(auth))
  .listen(8080);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
