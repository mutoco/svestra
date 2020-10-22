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
- Example home page:`/` (fetching from corresponding Strapi single type)
- Example about page:`/about` (fetching from corresponding Strapi single type)
- Example articles page:`/articles` (fetching from corresponding Strapi collection type)
- Example of single article page:`/articles/:Slug` (fetching from corresponding Strapi article slug)
- Login-screen if user is not authenticated (and therefore not allowed to read API)

- 🚧 TODO: Deployment setup and documentation
- 🚧 TODO: Typescript
- 🚧 TODO: SVG helpers
- 🚧 TODO: `srcset` helpers
- 🚧 TODO: Add example for i18n (fetching from Strapi)

## Good to know & troubleshooting
- We are using Strapis draft system together with `.env` variables to show drafts and published stuff on staging, but only published things on the live site. Can be seen in `/routes/articles/[slug].json.js` 
- Note that we use lowercase keys in Strapi for fields of single- and collection content-types e.g `title`. On the other side, we use capitalized keys like `Title` for components. The current version of Strapi (3.2.3) fails if you combine components with content-type that have the same key. Make sure you take care of this difference in your frontend application.
- All markdown fields with the suffix `_md` will be parsed automatically using a helper (src/_helpers/parse-markdown.js)
- 🚧 TODO: Will add more documentation soon. In the meantime, please be vocal over on the [Sapper issue tracker](https://github.com/sveltejs/sapper/issues).

## Deployment

- 🚧 TODO: Instructions will be added soon. We think of a staging and a production environment based on `.env` variables. In the meantime, checkout [Sappers deployment guide.](https://sapper.svelte.dev/docs#Deployment)

## Strapi Backend

Make sure you check out the corresponding [Svestra backend](https://github.com/mutoco/svestra/tree/master/backend) for more information about the backend side.
