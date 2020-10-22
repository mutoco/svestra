# Svestra backend

This setup uses the free community edition of [Strapi](https://strapi.io/) as a backend. It offers everything you need to have an API and a CMS for your application.

## Getting started

Open your terminal, navigate to this folder and type:

```bash
npm install
```

### Start plain or use our database dump file.
If you'd like to start with a plain, empty Strapi you can now just run `npm run develop`. 
But if you'd like to start based on our database dump (with basic settings, roles, users and some content-types.) follow these steps:

Within your `backend` folder type:

```bash
cat db-dump.sql | sqlite3 ./tmp/data.db
```

This imports the dump to the `tmp` folder of your Strapi instance.
We've created two users for you. An `admin` and an `editor` with the following credentials to login:

Username: admin@email.com
Password: 1234

Username: editor@email.com
Password 1234

## Examples & features

- Database dump provided with basic settings, roles, users and content-types.
    - Example settings to distinuish authenticated users from public ones.
    - Example token-setup to give other applications access to the API (e.g. a build pipeline that needs access like an authenticated user)
    - Example single-type for "home" and "about
    - Example collection-type called "article"
    - Example component called "teaser_media" added as [dynamic zones](https://strapi.io/blog/release-beta-18-dynamic-zones) to content-type "article"
    - Example of owner policy based (auto assign author)
- 🚧 TODO: Add example for i18n
- 🚧 TODO: Clean up database. There are probably a lot of testing/unused stuff we should ditch. Maybe Strapi will be able to handle this automatically in an upcoming release. Otherwise, we'll recreate a clean database and renew the dump file.
- 🚧 TODO: Maybe we should build a backup-mechanism if editors fuck up something?

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