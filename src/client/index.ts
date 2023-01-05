import { createCraqClient, configureContext } from "craq-client";
import react from "craq-react-renderer/dist/client";
import { configureStore } from "@reduxjs/toolkit";

import routes from "../frontend/routes";
import bundles from "../frontend/bundles";
import { actions, components } from "../frontend/registries";
import Application from "../frontend/Application";

const context = configureContext({
  actions,
  components,
  routes,
  store: configureStore({
    reducer: {},
    devTools: true,
    // @ts-ignore
    preloadedState: window.__INITIAL_STATE__,
  }),
});

const options = {
  bundles,
  renderers: { react },
};

createCraqClient(context, Application, options)
  .run(document.location.href)
  .render(document.getElementById("root"));
