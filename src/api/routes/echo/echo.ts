import { RouteRegisterCallback } from "../types";

export default ((router) => {
  router.get("/", async (ctx) => {
    ctx.body = { echo: "Hey" };
  });
}) as RouteRegisterCallback;
