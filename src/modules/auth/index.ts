import { Elysia, t } from "elysia";
import { prisma } from "~libs";
import { hashPassword } from "~utils";

export const auth = (app: Elysia) =>
  app.group("/auth", (app) =>
    app
      .post(
        "/signup",
        async ({ body, set }) => {
          const { email, name, password, username } = body;
          // validate duplicate email address
          const emailExists = await prisma.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
            },
          });
          if (emailExists) {
            set.status = 400;
            return {
              success: false,
              data: null,
              message: "Email address already in use.",
            };
          }

          // validate duplicate username
          const usernameExists = await prisma.user.findUnique({
            where: {
              username,
            },
            select: {
              id: true,
            },
          });

          if (usernameExists) {
            set.status = 400;
            return {
              success: false,
              data: null,
              message: "Someone already taken this username.",
            };
          }

          // handle password
          const encryptedPassword = await hashPassword(password);
        },
        {
          body: t.Object({
            name: t.String(),
            email: t.String(),
            username: t.String(),
            password: t.String(),
          }),
        }
      )
      .post("/login", () => {
        return "Login";
      })
  );
