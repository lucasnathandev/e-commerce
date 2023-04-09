import { FastifyReply, FastifyRequest } from "fastify";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token = await request.jwtVerify();
    request.token = token;
  } catch (error) {
    reply.send(error);
  }
};
