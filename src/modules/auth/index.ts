import { Elysia, t } from "elysia";
import { prisma } from "~libs";
import { comparePassword, hashPassword, md5hash } from "~utils";
import { jwt } from "@elysiajs/jwt";
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
          const { hash, salt } = await hashPassword(password);
          const emailHash = md5hash(email);
          const profileImage = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              hash,
              salt,
              username,
              profileImage,
            },
          });

          return {
            success: true,
            message: "Account created",
            data: {
              user: newUser,
            },
          };
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
      .use(
        jwt({
          secret: "itssecret",
          exp: "1h",
          name: "jwt",
        })
      )
      .post(
        "/login",
        async ({ body, set }) => {
          const { username, password } = body;
          // verify email/username
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                {
                  email: username,
                },
                {
                  username,
                },
              ],
            },
            select: {
              id: true,
              hash: true,
              salt: true,
            },
          });

          if (!user) {
            set.status = 400;
            return {
              success: false,
              data: null,
              message: "Invalid credentials",
            };
          }

          // verify password
          const match = await comparePassword(password, user.salt, user.hash);
          if (!match) {
            set.status = 400;
            return {
              success: false,
              data: null,
              message: "Invalid credentials",
            };
          }

          // generate access and refresh token
        },
        {
          body: t.Object({
            username: t.String(),
            password: t.String(),
          }),
        }
      )
  );
