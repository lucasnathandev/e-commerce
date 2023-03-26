import { FastifyReply, FastifyRequest } from "fastify";

export const authorize = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token = await request.jwtVerify();
    if (token.isAdmin) {
      return true;
    }
  } catch (err) {
    reply.send(err);
  }
  reply.code(401).send(new Error("Não autorizado"));
};
