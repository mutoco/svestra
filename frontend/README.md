# Svestra frontend

This setup is based on [Sapper](https://github.com/sveltejs/sapper) and Webpack and includes a lot of examples and settings to use it together with a [Strapi backend](https://github.com/mutoco/svestra/tree/master/backend).

## Getting started

Open your terminal, navigate to this folder and type:

```bash
npm install
npm run dev
```

## Examples & features

- Page prefetching
- SCSS Support + some helpers & mixins
- API-Example for GraphQL and REST [(/routes/articles)](https://github.com/mutoco/svestra/tree/master/frontend/src/routes/articles)
- Example home page:`/`
- Example about page:`/about`
- Example articles page:`/articles` (fetching from corresponding Strapi content-type)
- Example of single article page:`/articles/:Slug` (fetching from corresponding Strapi article slug)
- Login-screen if user is not authenticated (and therefore not allowed to read API)

- 🚧 Todo: Deployment setup and documentation
- 🚧 Todo: Typescript
- 🚧 Todo: SVG helpers
- 🚧 Todo: `srcset` helpers

## Good to know & troubleshooting
- Note that we use lowercase keys in Strapi for fields of content-types e.g `title` but capitalized keys like `Title` for components. The current version of Strapi (3.2.3) fails if you combine components with content-type that have the same key. Make sure you take care of this difference in your frontend application.
- All markdown fields with the suffix `_md` will be parsed automatically using a helper (src/_helpers/parse-markdown.js)
- 🚧 TODO: Will add more documentation soon. In the meantime, please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues).

## Deployment

- 🚧 TODO: Instructions will be added soon. We think of a staging and a production environment based on .env variables. In the meantime, checkout [Sappers deployment guide.](https://sapper.svelte.dev/docs#Deployment)

## Strapi Backend

Make sure you check out the corresponding [Svestra backend](https://github.com/mutoco/svestra/tree/master/backend) for more information about the backend side.
