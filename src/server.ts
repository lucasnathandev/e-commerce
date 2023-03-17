import { config as loadEnv } from "dotenv";
import fastify, { FastifyError } from "fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import fastifyAuth from "@fastify/auth";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { authenticate } from "./middlewares/authenticate";
import { authorize } from "./middlewares/authorize";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { routes } from "./routes";

loadEnv();

const server = fastify({
  logger: true,
  requestTimeout: 10000,
  maxRequestsPerSocket: 5,
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.setErrorHandler(
  (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    reply.code(error.statusCode || 500).send(error);
  }
);
server.register(routes);

server.register(cors, {
  origin: "localhost:8081",
});

server.register(fastifyJwt, {
  secret:
    "kjkwaeisakdjawdiw93u1ks89u123kj123u123j98u1239u12ljk12390u1290812lçk12398",
  sign: {
    expiresIn: "1d",
  },
});
server.register(fastifyAuth);

// Authentication midddleware
server.decorate("authenticate", authenticate);

// Authorization middleware
server.decorate("authorize", authorize);

const port: number = Number(process.env.PORT) || 8081;

server.listen({ port }, async (e, address) => {
  try {
    server.log.info("Server running on " + address);
  } catch (error) {
    server.log.error(e);
    process.exit(1);
  }
});
