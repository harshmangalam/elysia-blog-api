import Elysia from "elysia";
import { auth } from "./modules/auth";

const app = new Elysia().group("/api", (app) => app.use(auth)).listen(8080);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
