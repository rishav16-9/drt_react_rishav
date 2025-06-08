import { TRPCError } from "@trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { z } from "zod";
import { Satellite } from "../types";

export const spaceRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().optional(),
        limit: z.number().default(DEFAULT_LIMIT),
        objectTypes: z.array(z.string()).optional(),
        attributes: z.array(z.string()).optional(),
        objectCodes: z.array(z.string()).optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { limit, cursor, objectTypes, attributes, search, objectCodes } =
        input;
      const url = new URL("https://backend.digantara.dev/v1/satellites");
      // url.searchParams.set("limit", limit.toString());
      if (cursor) url.searchParams.set("offset", cursor.toString());
      if (objectTypes?.length) {
        url.searchParams.set("objectTypes", objectTypes.join(","));
      }

      if (attributes?.length) {
        url.searchParams.set("attributes", attributes.join(","));
      }
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
      let filteredItems = data.data as Satellite[];
      if (search) {
        filteredItems = filteredItems.filter(
          (item) =>
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.noradCatId?.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (objectCodes?.length) {
        const selectedCodes = objectCodes.map((c) => c.toUpperCase());

        filteredItems = filteredItems.filter((item) => {
          // Step 1: Check orbitCode exists
          if (!item.orbitCode) return false;

          // Step 2: Remove curly braces, split by comma
          const itemCodes = item.orbitCode
            .replace(/[{}]/g, "") // Remove { and }
            .split(",") // Split into array
            .map((code) => code.trim().toUpperCase()); // Clean spaces and normalize case

          // Step 3: Return true if any code matches selected filters
          return itemCodes.some((code) => selectedCodes.includes(code));
        });
      }

      return {
        items: filteredItems,
        nextCursor: cursor != null ? cursor + limit : limit,
      };
    }),
});
