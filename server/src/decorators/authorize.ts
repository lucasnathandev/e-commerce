import { FastifyReply, FastifyRequest } from "fastify";

type UserToken = {
  isAdmin: boolean;
};

export const authorize = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    if (request.user.isAdmin) {
      return true;
    }
  } catch (error) {
    reply.send(error);
  }
  reply.code(403).send(new Error("Não autorizado"));
};
