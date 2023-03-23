import { prisma } from "src/lib/prisma";
import { User } from "src/models/user";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { ControllerType } from "./../lib/types";
import bcrypt from "bcrypt";

const signIn: ControllerType = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { user, password } = User.parse(request.body);
    const foundUser = await prisma.user.findFirst({
      where: {
        user,
      },
    });

    await bcrypt.compare(password, foundUser?.password!);

    // Terminar autenticação com jwt
    return reply
      .status(200)
      .header("Bearer", reply.jwtSign(user))
      .redirect("/home");
  } catch (e) {
    return reply.status(403).send({
      message: "Credenciais inválidas",
    });
  }
};

export const loginController = {
  signIn,
};
