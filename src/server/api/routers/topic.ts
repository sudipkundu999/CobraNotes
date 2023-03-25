import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
  edit: protectedProcedure
    .input(z.object({ topicId: z.string(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.update({
        where: {
          id: input.topicId,
        },
        data: {
          title: input.title,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.delete({
        where: {
          id: input.topicId,
        },
      });
    }),
});
