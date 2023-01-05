import { DefaultState, Context } from "koa";
import Router from "koa-router";

import echo from "./echo";

const router = new Router<DefaultState, Context>({ prefix: "/echo" });

echo(router);

export default router;
