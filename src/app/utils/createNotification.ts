import { prisma } from "../lib/prisma.js";

const createNotification = async (userId: string, message: string) => {
  try {
    await prisma.notification.create({
      data: {
        userId,
        message,
        isRead: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default createNotification;