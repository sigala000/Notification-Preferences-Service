import request from "supertest";
import express from "express";
import evaluateRoutes from "../src/api/evaluate";

const app = express();
app.use(express.json());
app.use("/", evaluateRoutes);

test("should return allow or deny", async () => {
  const res = await request(app)
    .post("/evaluate")
    .send({
      userId: "u1",
      notificationType: "marketing_email",
      channel: "email",
      region: "EU",
      datetime: new Date().toISOString()
    });

  expect(["allow", "deny"]).toContain(res.body.decision);
});
