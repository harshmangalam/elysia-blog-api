import { Elysia } from "elysia";
import { prisma } from "./lib/prisma";
import { signupHandler, loginHandler } from "./handlers";

const app = new Elysia();
app
  .use((app) => app.state("prisma", prisma))
  .group("/api", (app) =>
    app.group("/auth", (app) =>
      app.post("/signup", signupHandler).post("/login", loginHandler)
    )
  )
  .listen(8080);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
