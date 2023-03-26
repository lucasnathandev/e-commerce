import { FastifyReply, FastifyRequest } from "fastify";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    console.log(this);

    await request.jwtVerify();
  } catch (err: any) {
    reply.send(err);
  }
};
