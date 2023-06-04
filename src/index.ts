import Elysia from "elysia";
import { auth } from "./modules/auth";
import { articles } from "./modules/articles";
import { swagger } from "@elysiajs/swagger";
const app = new Elysia()
  .use(swagger())
  .group("/api", (app) => app.use(auth).use(articles))
  .listen(8080);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
