import { onRequest as __api_image_generate_js_onRequest } from "/Users/thomasrooth/Downloads/plm/functions/api/image-generate.js"
import { onRequest as __api_news_js_onRequest } from "/Users/thomasrooth/Downloads/plm/functions/api/news.js"
import { onRequest as __api_news_generate_js_onRequest } from "/Users/thomasrooth/Downloads/plm/functions/api/news-generate.js"
import { onRequest as __api_subscribe_js_onRequest } from "/Users/thomasrooth/Downloads/plm/functions/api/subscribe.js"
import { onRequest as __api_web_search_js_onRequest } from "/Users/thomasrooth/Downloads/plm/functions/api/web-search.js"

export const routes = [
    {
      routePath: "/api/image-generate",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_image_generate_js_onRequest],
    },
  {
      routePath: "/api/news",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_news_js_onRequest],
    },
  {
      routePath: "/api/news-generate",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_news_generate_js_onRequest],
    },
  {
      routePath: "/api/subscribe",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_subscribe_js_onRequest],
    },
  {
      routePath: "/api/web-search",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_web_search_js_onRequest],
    },
  ]