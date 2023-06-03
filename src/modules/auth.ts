import { Elysia } from "elysia";

export const auth = (app: Elysia) =>
  app.group("/auth", (app) =>
    app
      .post("/signup", () => {
        return "SIgnup";
      })
      .post("/login", () => {
        return "Login";
      })
  );
