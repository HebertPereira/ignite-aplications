import { FastifyInstance } from "fastify";

import { AuthenticateOrg } from "./authenticate-org";
import { CreateOrg } from "./create-org";
import { NearbyOrgs } from "./nearby-orgs";
import { OrgContact } from "./org-contact";

export function useOrgsRoutes(app: FastifyInstance) {
  app.post("/org/auth", AuthenticateOrg);
  app.post("/org/create", CreateOrg);
  app.get("/orgs/nearby-orgs", NearbyOrgs);
  app.get("/orgs/contact/:id", OrgContact);
}
