import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { dateScalar } from "./types/CustomScalars.js";
// const graphqlHTTP = require("express-graphql");

// const { buildASTSchema } = require("graphql");
// const bp = require("body-parser");

// type CalendarEvent = {
//   id:ID,
//   title: String,
//   start: Date,
//   end: Date,
//   display: String,
//   color: String
// }

const resolvers = {
  Date: dateScalar,
  Query: {
    calendarEvents() {
      return events;
    },
    personnes() {
      return personnes;
    },
    account(_, args) {
      const foundedAccount = accounts.find(
        (e) => e.name === args.input.name && e.password === args.input.password
      );
      return foundedAccount;
    },
  },
  Mutation: {
    addEvent(_, args) {
      events.push(args.input);
      return args.input;
    },
    removeEvent(_, args) {
      events = events.filter((e) => e.id.toString() !== args.id.toString());
      return events;
    },
    addPersonne(_, args) {
      personnes.push(args.input);
      return args.input;
    },
    removePersonne(_, args) {
      personnes = personnes.filter(
        (e) => e.id.toString() !== args.id.toString()
      );
      return personnes;
    },
  },
};

const typeDefs = `#graphql

type CalendarEvent {
  id:ID!
  title: String!
  start: Date!
  end: Date!
  display: String!
  color: String
  account:Account
}
input CalendarEventInput {
  id:ID!
  title: String!
  start: Date!
  end: Date!
  display: String!
  color: String
  account:AccountInput
}

type Account {
  name:String
  password:String
}
input AccountInput {
  name:String!
  password:String!
}

type Personne {
  id: ID!
  name:String!
  color:String
  account:Account
}
input PersonneInput {
  id: ID!
  name:String!
  color:String
  account:AccountInput
}


scalar Date


type Query {
  calendarEvents:[CalendarEvent]
  account(input:AccountInput!):Account
  personnes:[Personne]
}

type Mutation {
  addEvent(input:CalendarEventInput!):CalendarEvent
  removeEvent(input:ID):[CalendarEvent]
  addPersonne(input:PersonneInput):Personne
  removePersonne(input:ID):[Personne]
}

`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const bourniquelAccount = { name: "Bourniquel", password: "bourniquel24" };

let personnes = [
  {
    id: "1",
    name: "Roméo",
    color: "#000000",
    account: bourniquelAccount,
  },
  {
    id: "2",
    name: "Simon",
    color: "#123456",
    account: bourniquelAccount,
  },
];

let events = [
  {
    id: "1",
    title: "Simon",
    start: new Date(2023, 9, 1),
    end: new Date(2023, 9, 5),
    display: "auto",
    color: "#000000",
    account: bourniquelAccount,
  },
  {
    id: "2",
    title: "Roméo",
    start: new Date(2023, 10, 13),
    end: new Date(2023, 10, 18),
    display: "auto",
    color: "#101050",
    account: bourniquelAccount,
  },
];

const accounts = [bourniquelAccount];

await server.start();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressMiddleware(server));

//@ts-ignore
app.get("/events", async (req, res) => {
  console.log(req);
  res.header("Access-Control-Allow-Origin", "*");
  res.json(events);
});
app.listen(8000, () => {
  console.log("server on");
});
