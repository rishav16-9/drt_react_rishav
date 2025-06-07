import { createTRPCRouter } from "../init";
import { spaceRouter } from "@/modules/home/server/procedures";
export const appRouter = createTRPCRouter({
  space: spaceRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
