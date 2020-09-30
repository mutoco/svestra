# Svestra
A Svelte/Sapper + Strapi boilerplate with some neat features, helpers and more.

## Features
- Page prefetching
- GraphQL first approach
- SASS Support + some helpers & mixins
- Todo: Typescript
- Todo: SVG helpers
- Todo: `srcset` helpers

## Pages
- A home page :`/`
- An about page :`/about`
- An articles page :`/articles`
- A single article page :`/articles/:Slug`

## Getting Started
The project has two folders `frontend` for your Sapper frontend and `backend` for your Strapi backend.


### Frontend
The frontend is built with Sapper. This sets up your frontend.
```bash
cd frontend

npm install
```

Then run `npm dev` to start your frontend server.

### Backend
The backend is built with Strapi. This sets up your backend.
```bash
cd backend

npm install
```

Then run `npm develop` to start your backend server.


## Deployment 

You can deploy your frontend by following the Sapper [deployment guide](https://sapper.svelte.dev/docs/#Deployment).

For your backend, Strapi has numerous options in it's [deployment guide](https://strapi.io/documentation/3.0.0-beta.x/getting-started/deployment.html).


## Contributing

Feel free to send over a PR for any changes you think should be included.