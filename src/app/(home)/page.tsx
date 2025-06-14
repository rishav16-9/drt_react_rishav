import { DEFAULT_LIMIT } from "@/constants";
import { HomeView, HomeViewSkeleton } from "@/modules/home/ui/views/home-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/home/search-params";

interface PageProps {
  searchParams: Promise<SearchParams>;
}
const Page = async ({ searchParams }: PageProps) => {
  const filters = await loadProductFilters(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.space.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
      objectTypes: filters.objectTypes,
      attributes: filters.attributes,
      search: filters.query,
      objectCodes: filters.orbitCodes,
    })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<HomeViewSkeleton />}>
        <HomeView />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
