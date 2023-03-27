import { FastifyReply, FastifyRequest } from "fastify";

type UserToken = {
  user: {
    isAdmin: boolean;
  };
};

export const authorize = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const token: UserToken = await request.jwtVerify();
    if (token.user.isAdmin) {
      return true;
    }
  } catch (error) {
    reply.send(error);
  }
  reply.code(403).send(new Error("Não autorizado"));
};
