import express from "express";

const app = express();

const port = 5000;

app.use(express.json());

let meData = [];
let nextId = 1;


//Adding Me
app.post("/me", (req, res) => {
  const { name, detail } = req.body;
  const newMe = { id: nextId++, name, detail };

  meData.push(newMe);
  res.status(201).send(newMe);
});

app.get("/meData", (req, res) => {
  res.status(201).send(meData);
});

//findingMe
app.get("/findme/:id", (req, res) => {
  const me = meData.find((me) => me.id === parseInt(req.params.id));

  if (!me) {
    return res.status(404).send("Can't find You");
  }

  res.status(200).send(me);
});

//updateMe
app.put("/updateMe/:id", (req, res) => {
  const me = meData.find((me) => me.id === parseInt(req.params.id));

  if (!me) {
    return res.status(404).send("Can't find You");
  }

  const { name, detail } = req.body;
  me.name = name;
  me.detail = detail;

  res.status(200).send(me);
});

// deleteMe

app.delete("/deleteMe/id", (req, res) => {
  const index = meData.findIndex((me) => me.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Can't find You");
  }

  meData.splice(index, 1);
  return res.status(204).send("Deleted You!!!");
});

app.get("/", (req, res) => {
  res.send("Hello!!! I'm Arjun.....");
});

app.listen(port, () => {
  console.log(`Server listening to port : ${port}`);
});
