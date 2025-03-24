import express from "express";
import client from "prom-client";
import { metricsMiddleware } from "./metricsMiddleware";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(metricsMiddleware);

app.get("/user", async (req, res) => {
//   await new Promise((resolve) => setTimeout(resolve, 100));
  res.send({
    name: "John Doe",
    age: 25,
  });
});

app.post("/user", (req, res) => {
  const user = req.body;
  res.send({
    ...user,
    id: 1,
  });
});

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
