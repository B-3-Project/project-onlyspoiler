import { deepFreeze } from "../utils/deepFreeze.js";

export const ROUTES = deepFreeze({
  VIEWALLCOMMENTS: "/comments/:Id",
  UPDATECOMMENTS: "/comments/:Id/:commentId"
});
