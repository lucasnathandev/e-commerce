import { FastifyReply, FastifyRequest } from "fastify";

type UserToken = {
  isAdmin: boolean;
};

export const authorize = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (!request.user.isAdmin) {
    return reply.status(401).send(new Error("Não autorizado."));
  }
};
