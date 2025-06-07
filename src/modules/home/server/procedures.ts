import { TRPCError } from "@trpc/server";
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

      // Parse JSON safely
      let data;
      try {
        data = await res.json();
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse response from external service.",
        });
      }

      // Check for response errors
      if (!res.ok || res.status === 400) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: data?.message || "Failed to fetch satellite data.",
        });
      }

      return {
        items: data.data || [],
        nextCursor: cursor != null ? cursor + limit : limit,
      };
    }),
});
