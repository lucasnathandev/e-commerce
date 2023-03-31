import { prisma } from "src/lib/prisma";
import { sendAccountInvadeWarning } from "src/services/mailer";

export type ActiveUserSession = {
  user: {
    id: string;
    isAdmin: boolean;
    lastActive: number;
  };
  ip: string;
};

export const activeSessions: ActiveUserSession[] = [];

export const createSession = function (session: ActiveUserSession) {
  activeSessions.push(session);
};

export const checkSession = async function (session: ActiveUserSession) {
  const isSignedIn = !!activeSessions.find(async (s) => {
    const suspectTryingToInvadeAccount =
      s.user.id === session?.user.id && s.ip !== session.ip;

    if (suspectTryingToInvadeAccount) {
      const user = await prisma.user.findFirst({
        where: {
          id: session.user.id,
        },
        select: {
          email: true,
        },
      });
      // Email service here
      await sendAccountInvadeWarning(user?.email!);
      return true;
    }

    return s.user.id === session?.user.id && s.ip === session.ip;
  });

  if (!isSignedIn) {
    activeSessions.push(session);
  }
  return session;
};
