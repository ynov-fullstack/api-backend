import express from "express";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors";
import pkg from 'body-parser';
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import http from "http";
import UserType from "./graphql/types/User.js";
import userResolvers from "./graphql/resolvers/user.resolver.js";
import session from "express-session";
import genFunc from 'connect-pg-simple';

const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.DATABASE_URL,
  ssl: false,
});

dotenv.config();
const { json } = pkg;

const app = express();
const httpServer = http.createServer(app);

const gqlServer = new ApolloServer(
  {
    typeDefs: UserType,
    resolvers: userResolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }
);

await gqlServer.start();

app.use(
  '/graphql',
  cors(),
  json(),
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000
    },
    store: sessionStore
  }),
  expressMiddleware(gqlServer, {
    context: async (
      { req }) => {
      console.log(req);
      return { test: "test" }
    }
  }),
)

await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
console.log(`🚀 Server ready`);
