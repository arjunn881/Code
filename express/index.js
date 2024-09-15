import 'dotenv/config'
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());



const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let meData = [];
let nextId = 1;

//Adding Me
app.post("/me", (req, res) => {
  logger.info("A post request is made to add you!!!")
  const { name, detail } = req.body;
  const newMe = { id: nextId++, name, detail };

  meData.push(newMe);
  res.status(201).send(newMe);
});
 
app.get("/meData", (req, res) => {
  logger.info("A get request is made to show all of you!!!")
  res.status(201).send(meData);
});

//findingMe
app.get("/findme/:id", (req, res) => {
  logger.info("A get request is made to find you!!!")
  const me = meData.find((me) => me.id === parseInt(req.params.id));

  if (!me) {
    return res.status(404).send("Can't find You");
  }

  res.status(200).send(me);
});

//updateMe
app.put("/updateMe/:id", (req, res) => {
  logger.info("A put request is made to update your information!!!")
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
  logger.info("A delete request is made to delete your infos.!!!")
  const index = meData.findIndex((me) => me.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Can't find You");
  }

  meData.splice(index, 1);
  return res.status(204).send("Deleted You!!!");
});

app.get("/", (req, res) => {
  logger.info("A get request is made to verify!!!")
  res.send("Hello!!! How are you????.....");
});

app.listen(port, () => {
  console.log(`Server listening to port : ${port}`);
});
