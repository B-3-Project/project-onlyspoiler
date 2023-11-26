import { deepFreeze } from "../utils/deepFreeze.js";

export const ROUTES = deepFreeze({
  VIEWALLPOSTS: "/contents",
  VIEWDETAILPOST: "/contents/:Id"
});
