import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from "./constants";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";

const main = async () => {
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: [
        "http://localhost:4000/graphql",
        "http://localhost:3000",
        "https://studio.apollographql.com",
      ],
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      // name: 'qid',
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        // secure: __prod__,   // cookie only works in https
        // sameSite: 'lax',    // csrf
        sameSite: "none",
        secure: true,
      },
      saveUninitialized: false,
      secret: "askjdlakhoiwjalknlasndka", // todo: move to env
      resave: false,
    })
  );

  app.set("trust proxy", !__prod__); // not secure method
  // todo
  // app.set('trust proxy', process.env.NODE_ENV !== 'production')    // secure method

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("Server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
