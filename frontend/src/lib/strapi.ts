// src/lib/strapi.ts
import Strapi from "strapi-sdk-js";

// Pull from environment variables
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
export const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

if (!STRAPI_URL) {
  console.warn("⚠️ NEXT_PUBLIC_STRAPI_URL is not defined!");
}
console.log(STRAPI_URL);

export const strapi = new Strapi({
  url: STRAPI_URL, // fallback
  prefix: "/api",
  axiosOptions: {
    headers: {
      Authorization: STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : "",
    },
  },
});
