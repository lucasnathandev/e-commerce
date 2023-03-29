import { config as loadEnv } from "dotenv";
import fastify, { FastifyError } from "fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import fastifyAuth from "@fastify/auth";
import fastifyJwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { authenticate } from "./decorators/authenticate";
import { authorize } from "./decorators/authorize";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { routes } from "./lib/routes";

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
server.register(helmet);

server.register(cors, {
  origin: "http://localhost:8002",
});
server.register(fastifyJwt, {
  secret:
    "kjkwaeisakdjawdiw93u1ks89u123kj123u123j98u1239u12ljk12390u1290812lçk12398",
  sign: {
    expiresIn: "1d",
  },
});
server.register(fastifyAuth);
server.register(fastifySwagger, {
  prefix: "/docs",
  swagger: {
    info: {
      title: "Server Requests API Swagger",
      description:
        "This swagger is the documentation of the e-commerce REST API",
      version: "0.1.0",
    },
  },
});

// Authentication midddleware
// server.decorate("authenticate", authenticate);

// Authorization middleware
server.decorate("authorize", authorize);
server.decorate("authenticate", authenticate);

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
