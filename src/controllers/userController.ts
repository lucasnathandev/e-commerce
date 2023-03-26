import {
  UserCreationSchema,
  UserPasswordUpdateSchema,
  UserInactivateSchema,
  UserId,
} from "./../models/user";
import bcrypt from "bcrypt";
import { HistoryData } from "./../lib/types";
import { HISTORY_ACTION_MESSAGES } from "./../lib/constants";
import { createHistory } from "./../utils/historyActions";
import { prisma } from "src/lib/prisma";
import { ControllerType } from "src/lib/types";

const getUsers: ControllerType = async (request, reply) => {
  return await prisma.user.findMany({
    orderBy: {
      firstName: "asc",
    },
  });
};

const getUser: ControllerType = async (request, reply) => {
  console.log("id " + request.params);
  const { id } = UserId.parse(request.params);

  const userData = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  const { password, isActive, ...filteredData } = userData!;

  return reply.status(reply.statusCode).send({ user: filteredData });
};

const createUser: ControllerType = async (request, reply) => {
  const { user, password, email } = UserCreationSchema.parse(request.body);

  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(password, salt);

  const createdUser = await prisma.user.create({
    data: {
      user,
      password: encrypted,
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
  const { password, id } = UserPasswordUpdateSchema.parse(request.body);
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
  const { id } = UserInactivateSchema.parse(request.body);

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

const activateUser: ControllerType = async (request, reply) => {
  const { id } = UserInactivateSchema.parse(request.body);

  const activatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      isActive: true,
    },
  });

  const historyData: HistoryData = {
    userId: activatedUser.id,
    orderId: "",
    action:
      HISTORY_ACTION_MESSAGES.USER_ACTIVATED +
      activatedUser.id +
      HISTORY_ACTION_MESSAGES.TIMESTAMP +
      activatedUser.updatedAt,
  };

  createHistory(historyData);

  return reply
    .status(reply.statusCode)
    .send({ message: "Usuário ativado com sucesso" });
};

export const userController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserPassword,
  inactivateUser,
  activateUser,
};
