import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { RegisterPet } from "./register-pet";
import { PetDetails } from "./pet-details";
import { FindNearbyPets } from "./find-nearby-pets";

export function usePetsRoutes(app: FastifyInstance) {
  app.post("/pets/register", { onRequest: [verifyJWT] }, RegisterPet);
  app.get("/pet/details/:id", PetDetails);
  app.get("/pet/find", FindNearbyPets);
}
