# Svestra backend

This setup uses the free community edition of [Strapi](https://strapi.io/) as a backend. It offers everything you need to have an API and a CMS for your application.

## Getting started

Open your terminal, navigate to this folder and type:

```bash
npm install
npm run develop
```

## Examples & features

- Example single-type for "home" and "about
- Example collection-type called "article"
- Example of owner policy based (auto assign author)
- Example component called "teaser_media" added as [dynamic zones](https://strapi.io/blog/release-beta-18-dynamic-zones) to content-type "article"
- Example settings to distinuish authenticated users from public ones.
- 🚧 TODO: Tokenization example to ensure, only authenticated users with token can access the API
- 🚧 TODO: Add example for i18n
- 🚧 TODO: Backup-mechanism if editors fuck up the page?

## Good to know & Troubleshooting
- Make sure you use lowercase keys for fields of content-types e.g `title` but capitalized keys like `Title` for components. The current version of Strapi (3.2.3) fails if you combine components with content-type that have the same key. On the other hand, you can easily use `Title` in every component you create and place them using dynamic zones. So a prefix related to content-type or component is not needed.
- Strapi uses Markdown in their richtext editor and outputs it as plain string in the API. So you need to parse the Markdown either on the Strapi- or on the application-side where you access the API. We are doing this by adding [marked](https://www.npmjs.com/package/marked) as a helper and call it in the server-route `[slug].json.js` of our [Sapper application.](https://github.com/mutoco/svestra/tree/master/frontend/src)
- ⚠️ Important note if you are using the Svestra frontend: Add the suffix `_md` to every field that can have markdown (e.g. richtext fields). On the frontend-side we parse markdown to HTML using a helper (src/_helpers/parse-markdown.js)
- In the current version of Strapi (3.2.3) the media library breaks if you delete a content-type that contains entries with media fields. Check this issue on [https://github.com/strapi/strapi/issues/6347](Github) to avoid/resolve it.
- Strapi may have problems if you rename a content-type. Beware that this could cause a lost of all your entries!

## Deployment

- 🚧 TODO: Instructions will be added soon. We think of a staging and a production environment based on .env variables.
- In the meantime, check out Strapi [deployment guide](https://strapi.io/documentation/3.0.0-beta.x/getting-started/deployment.html).

## Svelte/Sapper Frontend

You can use this Strapi setup totally independent from any Frontend stack. However, if you are interested in using it together with Svelte/Sapper, make sure you check out the [Svestra frontend](https://github.com/mutoco/svestra/tree/master/frontend).