import { prisma } from "src/lib/prisma";
import { sendAccountInvadeWarning } from "src/services/mailer";

export type ActiveUserSession = {
  id: string;
  isAdmin: boolean;
  lastActive: number;
  ip: string;
};

export const activeSessions: ActiveUserSession[] = [];

export const createSession = function (session: ActiveUserSession) {
  activeSessions.push(session);
};

export const checkSession = async function (session: ActiveUserSession) {
  const activeSession = activeSessions.find((s) => {
    s.id === session.id;
  })!;

  const activeSessionIndex = activeSessions.findIndex((s) => {
    s.id === session.id;
  })!;

  if (!activeSession) {
    return session;
  }

  const tenMinutes = 10 * 60 * 1000;

  const isUserInactiveOverTenMinutes: boolean =
    activeSession.lastActive <= session.lastActive - tenMinutes;

  const suspectTryingToInvadeAccount =
    activeSession.ip !== session.ip && !isUserInactiveOverTenMinutes;

  try {
    if (suspectTryingToInvadeAccount) {
      const user = await prisma.user.findFirst({
        where: {
          id: session.id,
        },
        select: {
          email: true,
        },
      });
      // Email service here
      user?.email &&
        (await sendAccountInvadeWarning(
          user.email,
          { text: "Tentaram invadir sua conta" },
          "123456"
        ));
    }

    if (
      activeSession.ip === session.ip &&
      session.lastActive > activeSession.lastActive
    ) {
      activeSessions[activeSessionIndex].lastActive = session.lastActive;
    }

    activeSession.lastActive = Date.now();
    return session;
  } catch (error) {
    return {
      error: new Error("erro" + error),
      message: "Cannot find user in database",
    };
  }
};
