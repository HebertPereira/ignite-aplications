import "dotenv/config";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { Environment } from "vitest/environments";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provida a DATABASE_URL environment variable");
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);
    process.env.DATABASE_URL = databaseURL;
    execSync("npx prisma migrate deploy");

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );
        await prisma.$disconnect();
      }
    };
  }
};
