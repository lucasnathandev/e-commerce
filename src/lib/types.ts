// Please for clean-code and code organization declare types as controller name as prefix and Type as sufix using
// camelCase. E.g.: UserType, SellerType, CartType, etc.

import { FastifyRequest, FastifyReply } from "fastify";

export type ControllerType = (
  request: FastifyRequest,
  reply: FastifyReply
) => typeof reply | any;
