import { prisma } from "../infrastructure/prisma";

export const policyService = {
  async isBlocked(region: string, type: string, channel: string) {
    const rule = await prisma.globalPolicy.findUnique({
      where: { region_type_channel: { region, type, channel } }
    });
    return rule?.blocked ?? false;
  }
};
