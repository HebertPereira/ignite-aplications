import { FastifyInstance } from "fastify";

import { RegisterPet } from "./pets/register-pet";
import { CreateOrg } from "./orgs/create-org";
import { PetDetails } from "./pets/pet-details";
import { FindNearbyPets } from "./pets/find-nearby-pets";

export function useRoutes(app: FastifyInstance) {
  // Pets
  app.post("/pets/register", RegisterPet); // should be registered an org
  app.get("/pet/details/:id", PetDetails);
  app.get("/pet/find", FindNearbyPets);

  // Orgs
  app.post("/orgs/create", CreateOrg);
}
