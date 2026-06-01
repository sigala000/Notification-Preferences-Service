import { prisma } from "../infrastructure/prisma";

export const preferencesService = {
  async get(userId: string) {
    return prisma.userPreference.findMany({ where: { userId } });
  },

  async upsert(userId: string, type: string, channel: string, enabled: boolean) {
    return prisma.userPreference.upsert({
      where: {
        userId_type_channel: { userId, type, channel }
      },
      update: { enabled },
      create: { userId, type, channel, enabled }
    });
  },

  async getQuietHours(userId: string) {
    return prisma.quietHours.findUnique({ where: { userId } });
  }
};
