import Elysia from "elysia";
import { auth } from "./modules/auth";
import { swagger } from "@elysiajs/swagger";
const app = new Elysia()
  .use(swagger())
  .group("/api", (app) => app.use(auth))
  .listen(8080);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
