import { deepFreeze } from "../utils/deepFreeze.js";

export const ROUTES = deepFreeze({
  SIGNUP: "/auth/signup",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout"
});
