const express = require("express");
const cors = require("cors");
// const graphqlHTTP = require("express-graphql");

// const { buildASTSchema } = require("graphql");
// const bp = require("body-parser");

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  display: string;
  color: string;
};

const events: CalendarEvent[] = [
  {
    title: "Simon",
    start: new Date(2023, 10, 10),
    end: new Date(2023, 10, 15),
    display: "auto",
    color: "#000000",
  },
  {
    title: "Roméo",
    start: new Date(2023, 10, 13),
    end: new Date(2023, 10, 18),
    display: "auto",
    color: "#101050",
  },
];

const app = express();
app.use(cors());
app.use();

//@ts-ignore
app.get("/events", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json(events);
});

app.listen(8000, () => {
  console.log("server on");
});
