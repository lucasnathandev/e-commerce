import { FastifyReply, FastifyRequest } from "fastify";

export const authorize = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Aqui você pode verificar se o usuário tem permissão para acessar a rota
  // Exemplo:
  if (!request.user.isAdmin) {
    reply.code(401).send(new Error("Usuário não autorizado"));
  }
};
