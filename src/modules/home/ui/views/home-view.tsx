"use client";

import { DEFAULT_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { MainSection } from "../sections/main-section";
import { SelectedAssetSection } from "../sections/selected-asset-section";

export const HomeView = () => {
  const trpc = useTRPC();
  // const { data } = useSuspenseInfiniteQuery(
  //   trpc.space.getMany.infiniteQueryOptions(
  //     {
  //       limit: DEFAULT_LIMIT,
  //     },
  //     {
  //       getNextPageParam: (lastPage) => lastPage.nextCursor,
  //     }
  //   )
  // );
  return (
    <div className="flex flex-col max-w-[2400px] mx-auto pt-2.5 px-4 mb-10">
      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <MainSection />
        </div>
        <div className="w-full xl:w-[380px] 2xl:w-[460px] shrink-1">
          <SelectedAssetSection />
        </div>
      </div>
    </div>
  );
};
