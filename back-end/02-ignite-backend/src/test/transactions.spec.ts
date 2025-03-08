import { afterAll, beforeAll, beforeEach, expect, it } from "vitest";
import { execSync } from "node:child_process";
import request from "supertest";
import { app } from "../app";
import { describe } from "node:test";

describe("Transactiobs routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should be able to create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5000,
        type: "credit"
      })
      .expect(201);
  });

  it("shold be able to list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5000,
        type: "credit"
      });

    const cookies = createTransactionResponse.get("Set-Cookie")!;

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const listData = listTransactionsResponse.body.transactions;

    expect(listData[0]).toEqual(
      expect.objectContaining({
        amount: 5000,
        title: "new transaction"
      })
    );
  });

  it("shold be able to get a specific transaction", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5000,
        type: "credit"
      });

    const cookies = createTransactionResponse.get("Set-Cookie")!;

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const transactionsId = listTransactionsResponse.body.transactions[0].id;

    const getTransactionsResponse = await request(app.server)
      .get(`/transactions/${transactionsId}`)
      .set("Cookie", cookies)
      .expect(200);

    const listData = getTransactionsResponse.body.transaction;

    expect(listData).toEqual(
      expect.objectContaining({
        amount: 5000,
        title: "new transaction"
      })
    );
  });

  it("shold be able to get the summary", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5000,
        type: "credit"
      });

    const cookies = createTransactionResponse.get("Set-Cookie")!;

    await request(app.server)
      .post("/transactions")
      .set("Cookie", cookies)
      .send({
        title: "new transaction",
        amount: 2000,
        type: "debit"
      });

    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies)
      .expect(200);

    const summaryData = summaryResponse.body.summary;

    expect(summaryData).toEqual(
      expect.objectContaining({
        amount: 3000
      })
    );
  });
});
