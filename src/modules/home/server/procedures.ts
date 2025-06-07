import { DEFAULT_LIMIT } from "@/constants";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { z } from "zod";

export const spaceRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ input }) => {
      const { limit, cursor } = input;

      const url = new URL("https://backend.digantara.dev/v1/satellites");
      url.searchParams.set("limit", limit.toString());
      if (cursor) url.searchParams.set("offset", cursor.toString());

      const res = await fetch(url.toString());
      const data = await res.json();

      // NOTE: Update the return type according to actual API structure
      return {
        items: data.data || [], // assuming API returns data under `data`
        nextCursor: cursor != null ? cursor + limit : limit, // simple pagination logic
      };
    }),
});
