"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useFilters } from "../../hooks/use-filter";
import { DEFAULT_LIMIT } from "@/constants";
import { Satellite } from "../../types";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { add, remove } from "@/lib/redux/slices/satelliteSlice";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const headers = [
  { key: "select", value: "Select" },
  { key: "name", value: "Name" },
  { key: "noradCatId", value: "NoradCatId" },
  { key: "orbitCode", value: "Orbit Code" },
  { key: "objectCode", value: "Object Type" },
  { key: "countryCode", value: "Country Code" },
  { key: "launchDate", value: "Launch Date" },
];
// Row component for react-window
const Row = ({
  index,
  style,
  data,
}: {
  index: number;
  style: React.CSSProperties;
  data: Satellite[];
}) => {
  const item = data[index];
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.satelliteData.data);
  const isChecked = selector.some((ele) => ele.noradCatId === item.noradCatId);

  const handleChange = () => {
    if (isChecked) {
      dispatch(remove(item));
    } else {
      if (selector.length >= 10) {
        toast.error("Can only select up to 10 records");
        return;
      }
      dispatch(add(item));
    }
  };
  return (
    <div
      style={style}
      className="border-b border-gray-700 text-sm hover:bg-gray-800 "
    >
      {/* Mobile Layout (stacked cards) */}
      <div className="block lg:hidden text-white gap-y-1 text-sm p-2 py-8">
        <input type="checkbox" checked={isChecked} onChange={handleChange} />
        <div className="flex items-center justify-between mb-1">
          <p className="line-clamp-2">Name: {item.name}</p>
          <p>Norad cat id: {item.noradCatId}</p>
        </div>
        <div className="flex items-center justify-between gap-y-6 mb-1">
          <p>Orbit Code: {item.orbitCode || "-"}</p>
          <p>Object Type: {item.objectType || "-"}</p>
        </div>
        <div className="flex items-center justify-between ">
          <p>Country Code: {item.countryCode || "-"}</p>
          <p>Launch Date: {item.launchDate || "-"}</p>
        </div>
      </div>
      <div className="hidden lg:grid grid-cols-7 justify-items-start px-4 py-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="col-span-1 cursor-pointer"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-white line-clamp-1 w-full text-left">
              {item.name}
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
        <p className="text-white ">{item.noradCatId}</p>
        <p className="text-white">{item.orbitCode || ""}</p>
        <p className="text-white">{item.objectType || ""}</p>
        <p className="text-white">{item.countryCode || ""}</p>
        <p className="text-white">{item.launchDate || ""}</p>
      </div>
    </div>
  );
};

export const SatteliteData = () => {
  const trpc = useTRPC();
  const [filters] = useFilters();
  const listRef = useRef<List>(null);

  const { data, error, isLoading, isError } = useSuspenseInfiniteQuery(
    trpc.space.getMany.infiniteQueryOptions(
      {
        limit: DEFAULT_LIMIT,
        objectTypes: filters.objectTypes,
        attributes: filters.attributes,
        search: filters.query,
        objectCodes: filters.orbitCodes,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    )
  );

  const items = useMemo(
    () => data.pages.flatMap((page) => page.items),
    [data.pages]
  );

  useEffect(() => {
    if (isError && error) {
      toast.error("Failed to load satellite data", {
        description: error.message,
        duration: 5000,
      });
    }
  }, [isError, error]);

  if (isLoading) return <SatelliteDataSkeleton />;

  if (isError) {
    return (
      <div className="border border-red-500 rounded-md p-4 bg-red-100 text-red-800">
        <p className="font-bold">Error loading satellite data</p>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="border border-gray-700 rounded-md">
      <div className="bg-gray-900 text-white p-2 font-semibold">
        Satellite Data ({items.length.toLocaleString()} records)
      </div>

      <div className="overflow-y-hidden">
        {/* Header */}
        <div className="lg:grid hidden grid-cols-7 justify-items-start bg-gray-800 py-2 px-4 text-sm font-semibold text-white sticky top-0 z-10">
          {headers.map((header, index) => (
            <div key={index} className="">
              {header.value}
            </div>
          ))}
        </div>

        {/* React-Window List */}
        <div className="hidden lg:block">
          <List
            ref={listRef}
            height={430}
            itemCount={items.length}
            itemSize={64}
            itemData={items}
            overscanCount={5}
            className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            width={"100%"}
          >
            {Row}
          </List>
        </div>
        <div className="block lg:hidden">
          <List
            ref={listRef}
            height={500}
            itemCount={items.length}
            itemSize={150}
            itemData={items}
            overscanCount={5}
            className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            width={"100%"}
          >
            {Row}
          </List>
        </div>
      </div>
    </div>
  );
};

export const SatelliteDataSkeleton = () => {
  return (
    <div className="border border-gray-700 rounded-md">
      <div className="bg-gray-900 text-white p-2 font-semibold">
        Satellite Data
      </div>

      <div className="overflow-y-hidden">
        {/* Header */}
        <div className="lg:grid hidden grid-cols-7 justify-items-start bg-gray-800 py-2 px-4 text-sm font-semibold text-white sticky top-0 z-10">
          {headers.map((header, index) => (
            <div key={index} className="">
              {header.value}
            </div>
          ))}
        </div>
        <div className="border border-gray-800 h-full w-full h-max-[500px]" />
      </div>
    </div>
  );
};
