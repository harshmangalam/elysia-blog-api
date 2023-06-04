import Elysia, { t } from "elysia";

export const articles = (app: Elysia) =>
  app.group("/articles", (app) =>
    app.post(
      "/",
      async ({ body }) => {
        return body;
      },
      {
        body: t.Object({
          title: t.String(),
          bodyMarkdown: t.String(),
          published: t.Optional(t.Boolean({ default: false })),
          mainImage: t.Optional(t.String()),
          canonicalUrl: t.Optional(t.String()),
          description: t.String(),
          tags: t.String(),
          organisationId: t.Optional(t.String()),
        }),
      }
    )
  );
