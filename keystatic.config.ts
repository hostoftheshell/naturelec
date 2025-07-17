// keystatic.config.ts
import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "hostoftheshell",
      name: "naturelec",
    },
    branchPrefix: "keystatic/",
  },
});
