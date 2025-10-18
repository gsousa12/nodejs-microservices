import express from "express";

const app = express();
const port = 3000;

app.get("/", (_, res) => {
  res.send("Notification Service");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
