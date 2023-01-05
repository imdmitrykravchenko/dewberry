import fs from "fs";
import { createCraqServer, configureContext } from "craq-server";
import react from "craq-react-renderer/dist/server";
import { configureStore } from "@reduxjs/toolkit";

import routes from "../frontend/routes";
import bundles from "../frontend/bundles";
import { actions, components } from "../frontend/registries";
import Application from "../frontend/Application";

const context = configureContext({
  actions,
  components,
  routes,
  store: configureStore({ reducer: {} }),
});

const options = {
  bundles,
  renderers: { react },
  options: {
    assetsPath: ASSETS_PATH,
    statsFile: {
      content: JSON.parse(fs.readFileSync(STATS_FILE_PATH).toString())
        .assetsByChunkName,
    },
  },
};

createCraqServer(context, Application, options).listen(3001);
