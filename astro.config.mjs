// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: "https://naturelec.netlify.app/",
  integrations: [react(), markdoc(), keystatic()],
  adapter: netlify(),
});
