import { onRequest as __api_balkan_beats_live_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/balkan-beats-live.js"
import { onRequest as __api_balkan_beats_speak_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/balkan-beats-speak.js"
import { onRequest as __api_balkan_beats_translate_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/balkan-beats-translate.js"
import { onRequest as __api_bosnian_beats_live_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/bosnian-beats-live.js"
import { onRequest as __api_bosnian_beats_speak_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/bosnian-beats-speak.js"
import { onRequest as __api_bosnian_beats_translate_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/bosnian-beats-translate.js"
import { onRequest as __api_comfyui_loras_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/comfyui-loras.js"
import { onRequest as __api_image_generate_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/image-generate.js"
import { onRequest as __api_news_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/news.js"
import { onRequest as __api_news_generate_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/news-generate.js"
import { onRequest as __api_subscribe_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/subscribe.js"
import { onRequest as __api_web_search_js_onRequest } from "/Users/thomasrooth/Documents/PLM-landing/functions/api/web-search.js"

export const routes = [
    {
      routePath: "/api/balkan-beats-live",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_balkan_beats_live_js_onRequest],
    },
  {
      routePath: "/api/balkan-beats-speak",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_balkan_beats_speak_js_onRequest],
    },
  {
      routePath: "/api/balkan-beats-translate",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_balkan_beats_translate_js_onRequest],
    },
  {
      routePath: "/api/bosnian-beats-live",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_bosnian_beats_live_js_onRequest],
    },
  {
      routePath: "/api/bosnian-beats-speak",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_bosnian_beats_speak_js_onRequest],
    },
  {
      routePath: "/api/bosnian-beats-translate",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_bosnian_beats_translate_js_onRequest],
    },
  {
      routePath: "/api/comfyui-loras",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_comfyui_loras_js_onRequest],
    },
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