import express from "express";
import cors from "cors";
import { GraphQLScalarType, Kind } from "graphql";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
// const graphqlHTTP = require("express-graphql");

// const { buildASTSchema } = require("graphql");
// const bp = require("body-parser");

const dateScalar = new GraphQLScalarType({
  name: "Date",

  description: "Date custom scalar type",

  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }

    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },

  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }

    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date

      return new Date(parseInt(ast.value, 10));
    }

    // Invalid hard-coded value (not an integer)

    return null;
  },
});
const resolvers = {
  Query: {
    Date: dateScalar,
  },
};

const typeDefs = `#graphql

type CalendarEvent {
  title: String
  start: Date
  end: Date
  display: String
  color: String
}

type Query {
  calendarEvents:[CalendarEvent]
}

`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.start();

const events = [
  {
    title: "Simon",
    start: new Date(2023, 9, 1),
    end: new Date(2023, 9, 5),
    display: "auto",
    color: "#000000",
  },
  {
    title: "Roméo",
    start: new Date(2023, 10, 13),
    end: new Date(2023, 10, 18),
    display: "background",
    color: "#101050",
  },
];

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
