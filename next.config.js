import { withBlitz } from "@blitzjs/next";
import { sessionMiddleware, simpleRolesIsAuthorized } from "blitz";

const config = {}
module.exports = withBlitz(config);
