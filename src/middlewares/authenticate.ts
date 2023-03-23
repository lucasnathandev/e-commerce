import { FastifyReply, FastifyRequest } from "fastify";
import { Handler } from "@fastify/middie";
import { ServerResponse } from "http";

export const authenticate: Handler = async (
  request: any,
  reply: ServerResponse
) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.end(err);
  }
};
