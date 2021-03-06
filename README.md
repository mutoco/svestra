# Svestra

A Svelte/Sapper + Strapi boilerplate with some neat features, helpers, examples and more.

## Getting Started

The project has two folders `frontend` for your Sapper frontend and `backend` for your Strapi backend.


### Frontend

The frontend is built with Sapper. This sets up your frontend.
```bash
cd frontend
npm install
```

Before starting your frontend-server, make sure to create an `.env` file in
your frontend folder. You can use the provided `.env.example` for that.

Then run `npm run dev` to start your frontend server.

Checkout the [Svestra frontend README](https://github.com/mutoco/svestra/tree/master/frontend) for more information and guidance.


### Backend

The backend is built with Strapi. This sets up your backend.

```bash
cd backend
npm install
```

You can either start with a plain instance of Strapi by running `npm run develop` or you can use import our [database dump](https://github.com/mutoco/svestra/tree/master/backend) file with helpful settings, roles, users and some content-types to get started.

Checkout the [Svestra backend README](https://github.com/mutoco/svestra/tree/master/backend) for more information and guidance.

## Contributing

Feel free to send over a PR for any changes you think should be included.
