import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (_: Request, res: Response) => {
  res.send("Report Service com TypeScript!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
