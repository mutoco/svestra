'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
module.exports = {

      /**
       * This should set the author automatically. Based on https://strapi.io/documentation/3.0.0-beta.x/guides/is-owner.html#introduction
       *
       * @return {Object}
       */
    
      async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          data.author = ctx.state.user.id;
          entity = await strapi.services.article.create(data, { files });
        } else {
          ctx.request.body.author = ctx.state.user.id;
          entity = await strapi.services.article.create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models.article });
      },

};
