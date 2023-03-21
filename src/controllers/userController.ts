import { ControllerType } from "src/lib/types";

const index: ControllerType = (request, reply) => {
  return "User";
};

export const userController = {
  index,
};
