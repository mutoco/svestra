import fetchStrapi from '../_helpers/fetch-strapi';

export async function get(req, res) {
  fetchStrapi(req, res, 'home', 'single');
}