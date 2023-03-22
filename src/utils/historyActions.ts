import { HistoryData } from "./../lib/types";

import { History } from "./../models/history";
import { prisma } from "src/lib/prisma";

export const createHistory = async (data: HistoryData) => {
  const { action, orderId, userId } = History.parse(data);

  await prisma.history.create({
    data: {
      action,
      orderId,
      userId,
    },
  });
};
