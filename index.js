const express = require("express");
const app = express();
const db = [
  {
    id: 1,
    name: "Marcus Dev",
    email: "marcus@salt.dev",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).setHeader("location", `/api/developers/1`).json(db[0]);
});

app.get("/api/developers/:id", (req, res) => {
  const dev = db.find((dev) => dev.id == req.params.id);
  return dev ? res.json(dev) : res.status(404).end();
});

app.post("/api/developers/", (req, res) => {
  const newDeveloper = {
    id: db.length + 1,
    name: req.body.name,
    email: req.body.email,
  };

  db.push(newDeveloper);

  res
    .status(201)
    .setHeader("location", `/api/developers/${newDeveloper.id}`)
    .json(newDeveloper);
});

app.delete("/api/developers/:id", (req, res) => {
  const filter = db.filter((data) => data.id != req.params.id);
  res.status(204).send("No content");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
