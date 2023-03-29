import { UserLoginSchema } from "./../models/user";
import { prisma } from "src/lib/prisma";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { ControllerType } from "./../lib/types";
import bcrypt from "bcrypt";

type ActiveUserSession = {
  user: {
    id: string;
    isAdmin: boolean;
  };
  ip: string;
};

const activeSessions: ActiveUserSession[] = [];

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

    const isAdmin = await prisma.admin.findFirst({
      where: { userId: foundUser?.id },
    });

    await bcrypt.compare(password, foundUser?.password!);

    const signedInUser = {
      user: {
        id: foundUser?.id!,
        isAdmin: !!isAdmin,
        ip: request.ip,
      },
    };

    const token = await reply.jwtSign(signedInUser);

    const isSignedIn = !!activeSessions.find(async (session) => {
      const suspectTryingToInvadeAccount =
        session.user.id === signedInUser?.user.id &&
        session.ip !== signedInUser.user.ip;

      if (suspectTryingToInvadeAccount) {
        const userEmail = await prisma.user.findFirst({
          where: {
            id: session.user.id,
          },
          select: {
            email: true,
          },
        });
        console.log("Send e-mail for account user");
        // Email service here
        return reply.status(401).send(new Error("Credenciais inválidas."));
      }

      return (
        session.user.id === signedInUser?.user.id &&
        session.ip === signedInUser.user.ip
      );
    });

    if (!isSignedIn) {
      activeSessions.push({
        user: {
          id: signedInUser.user.id,
          isAdmin: signedInUser.user.isAdmin,
        },
        ip: signedInUser.user.ip,
      });
    }

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
  console.log(activeSessions);

  try {
    const { user } = await request.jwtVerify();

    const activeUserIndex = activeSessions.findIndex((session) => {
      session.user.id === user.id;
    });

    activeSessions.splice(activeUserIndex, 1);

    return reply.status(200).send("");
  } catch (error) {
    reply.send(error);
  }
};

export const loginController = {
  signIn,
  signOut,
};
