import { config as loadEnv } from "dotenv";
import fastify, { FastifyError } from "fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import fastifyAuth from "@fastify/auth";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { authenticate } from "./decorators/authenticate";
import { authorize } from "./decorators/authorize";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { routes } from "./lib/routes";

loadEnv();

const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

const server = fastify({
  logger: true,
  requestTimeout: 10000,
  bodyLimit: 1048576 * 5,
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.setErrorHandler(
  (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    reply.code(error.statusCode || 500).send(error.message);
  }
);

server.register(rateLimit, {
  max: 60,
  global: false,
  ban: 3,
  cache: 10000,
  timeWindow: "1 minute",
  allowList: ["127.0.0.1"],
});
server.register(helmet, {
  xssFilter: true,
  noSniff: true,
  hidePoweredBy: true,
  hsts: { maxAge: ONE_YEAR_MS },
  ieNoOpen: true,
  dnsPrefetchControl: { allow: false },
  // expectCt: {
  //   enforce: true,
  //   maxAge: 30,
  // },
  referrerPolicy: { policy: "same-origin" },
});

server.register(cors, {
  origin: process.env.WEB_ORIGIN || "*",
  allowedHeaders: ["Content-Type", "Authorization"],
});
server.register(fastifyJwt, {
  secret:
    process.env.JWT_SECRET || ".aslieoiqw90123oiopOIOPiudopI912-09-123liasd]~]",
  sign: {
    expiresIn: "1d",
  },
});

server.register(fastifyAuth);

// Authentication midddleware
server.decorate("authenticate", authenticate);

// Authorization middleware
server.decorate("authorize", authorize);
server.register(routes);

const port: number = Number(process.env.PORT) || 8081;

server.listen({ port }, async (e, address) => {
  try {
    server.log.info("Server running on " + address);
  } catch (error) {
    server.log.error(e);
    process.exit(1);
  }
});
