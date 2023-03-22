import { HistoryData } from "./../lib/types";
import { HISTORY_ACTION_MESSAGES } from "./../lib/constants";
import { createHistory } from "./../utils/historyActions";
import { prisma } from "src/lib/prisma";
import { ControllerType } from "src/lib/types";
import { User } from "src/models/user";

const index: ControllerType = async (request, reply) => {
  return await prisma.user.findMany({
    orderBy: {
      firstName: "asc",
    },
  });
};

const getUsers: ControllerType = async (request, reply) => {
  return await prisma.user.findMany({
    orderBy: {
      firstName: "asc",
    },
  });
};

const getUser: ControllerType = async (request, reply) => {
  const { id } = User.parse(request.body);

  const userData = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  return reply.status(reply.statusCode).send({ user: userData });
};

const createUser: ControllerType = async (request, reply) => {
  const { user, password, email } = User.parse(request.body);
  const createdUser = await prisma.user.create({
    data: {
      user,
      password,
      email,
    },
  });

  const historyData: HistoryData = {
    orderId: "",
    userId: createdUser.id,
    action:
      HISTORY_ACTION_MESSAGES.USER_CREATED +
      createdUser.id +
      HISTORY_ACTION_MESSAGES.TIMESTAMP +
      createdUser.createdAt,
  };

  createHistory(historyData);

  return reply
    .status(reply.statusCode)
    .send({ message: "Conta criada com sucesso!" });
};

const updateUser: ControllerType = async (request, reply) => {
  const { id, ...userData } = User.parse(request.body);

  const { firstName, lastName, email, type, age } = userData;
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      email,
      type,
      age,
    },
  });

  const historyData: HistoryData = {
    orderId: "",
    userId: updatedUser.id,
    action:
      HISTORY_ACTION_MESSAGES.USER_UPDATED +
      updatedUser.id +
      HISTORY_ACTION_MESSAGES.TIMESTAMP +
      updatedUser.updatedAt,
  };

  createHistory(historyData);

  return reply.status(reply.statusCode).send({
    message: "Perfil atualizado.",
  });
};

const updateUserPassword: ControllerType = async (request, reply) => {
  const { password, id } = User.parse(request.body);
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      password,
    },
  });

  const historyData: HistoryData = {
    orderId: "",
    userId: updatedUser.id,
    action:
      HISTORY_ACTION_MESSAGES.USER_PASSWORD_UPDATED +
      updatedUser.id +
      HISTORY_ACTION_MESSAGES.TIMESTAMP +
      updatedUser.updatedAt,
  };

  createHistory(historyData);

  return reply.status(reply.statusCode).send({ message: "Senha atualizada." });
};

const inactivateUser: ControllerType = async (request, reply) => {
  const { id } = User.parse(request.body);

  const inactivatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });

  const historyData: HistoryData = {
    userId: inactivatedUser.id,
    orderId: "",
    action:
      HISTORY_ACTION_MESSAGES.USER_INACTIVATED +
      inactivatedUser.id +
      HISTORY_ACTION_MESSAGES.TIMESTAMP +
      inactivatedUser.updatedAt,
  };

  createHistory(historyData);

  return reply
    .status(reply.statusCode)
    .send({ message: "Usuário inativado com sucesso" });
};

export const userController = {
  index,
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserPassword,
  inactivateUser,
};
