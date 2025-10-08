import Strapi from "strapi-sdk-js";

export const strapi = new Strapi({
  url: process.env.STRAPI_URL!,   // e.g., http://localhost:1337
  prefix: "/api",
  axiosOptions: {
    headers: process.env.STRAPI_TOKEN
      ? { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` }
      : {},
  },
});
