import { UserLoginSchema } from "./../models/user";
import { prisma } from "src/lib/prisma";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { ControllerType } from "./../lib/types";
import bcrypt from "bcrypt";

const signIn: ControllerType = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { user, password } = UserLoginSchema.parse(request.body);
    const foundUser = await prisma.user.findFirst({
      where: {
        user,
        isActive: true,
      },
    });

    const isAdmin = await prisma.admin.findFirst({
      where: { userId: foundUser?.id },
    });

    await bcrypt.compare(password, foundUser?.password!);

    const token = await reply.jwtSign({
      user: {
        id: foundUser?.id,
        isAdmin: !!isAdmin,
      },
    });

    return reply.status(200).send(token);
  } catch (e) {
    reply.send(e);
  }

  reply.status(401).send({
    message: "Credenciais inválidas",
  });
};

export const loginController = {
  signIn,
};
