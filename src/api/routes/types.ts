import { DefaultState, Context } from "koa";
import Router from "koa-router";

export type RouteRegisterCallback = (
  router: Router<DefaultState, Context>
) => void;
