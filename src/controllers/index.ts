import { ControllerType } from "./../lib/types";

export const indexController: ControllerType = (request, reply) => {
  return { message: "Olá" };
};
