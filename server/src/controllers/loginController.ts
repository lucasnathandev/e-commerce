import {
  ActiveUserSession,
  activeSessions,
  checkSession,
  createSession,
} from "./lib/session";
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
  const { user, password } = UserLoginSchema.parse(request.body);

  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        user,
        isActive: true,
      },
    });

    if (!foundUser) {
      return reply.status(401).send(new Error("Credenciais inválidas"));
    }

    const isAdmin = await prisma.admin.findFirst({
      where: { userId: foundUser?.id },
    });

    const passwordMatched: boolean = await bcrypt.compare(
      password,
      foundUser?.password!
    );

    if (!passwordMatched) {
      return reply.status(401).send(new Error("Credenciais inválidas."));
    }

    const signedInUser: ActiveUserSession = {
      id: foundUser?.id,
      isAdmin: !!isAdmin,
      lastActive: Date.now(),
      ip: request.ip,
    };

    const token = await reply.jwtSign(signedInUser);
    checkSession(signedInUser)
      .then((session) => {
        !session?.error && createSession(session);
        reply.status(401).send({
          ...session,
        });
      })
      .catch((error) => reply.status(401).send(error));

    return reply.status(200).send(token);
  } catch (error) {
    console.log(activeSessions);

    reply.send(error);
  }

  reply.status(401).send({
    message: "Credenciais inválidas",
  });
};

const signOut: ControllerType = async (request, reply) => {
  try {
    const activeUserIndex = activeSessions.findIndex((session) => {
      session.id === request.user.id;
    });

    activeSessions.splice(activeUserIndex, 1);
    return reply.status(200).send({ logout: true });
  } catch (error) {
    reply.send(error);
  }
};

export const loginController = {
  signIn,
  signOut,
};
