"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { remove, removeAll } from "@/lib/redux/slices/satelliteSlice";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Link from "next/link";

export const SelectedAssetSection = () => {
  const data = useAppSelector((state) => state.satelliteData.data);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col flex-1 gap-y-3">
      <div className="flex items-center justify-between">
        <p className="lg:text-3xl sm:text-2xl font-semibold text-white">
          Selected asset
        </p>
        <Button
          className="text-white cursor-pointer group"
          onClick={() => dispatch(removeAll())}
          variant="ghost"
          disabled={data.length === 0}
        >
          <div className="flex items-center gap-2">
            Clear all
            <XIcon className="text-white group-hover:text-black" />
          </div>
        </Button>
      </div>
      <div className="border h-full max-h-[530px] w-full rounded-lg border-gray-700">
        {data.map((ele) => (
          <div
            key={ele.noradCatId}
            className="flex items-center justify-between gap-6 px-3 hover:bg-gray-800 rounded-lg "
          >
            <p className="text-white">
              {ele.noradCatId}-{ele.name}
            </p>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => dispatch(remove(ele))}
              className="hover:bg-transparent cursor-pointer"
            >
              <XIcon className="size-5 text-white" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "bg-gray-800 d text-white hover:text-black ",
          data.length === 0 && "text-white-700 cursor-not-allowed bg-gray-400"
        )}
        disabled={data.length === 0}
      >
        <Link
          href={"/selectedasset"}
          onClick={(e) => {
            if (data.length === 0) {
              e.preventDefault(); // stops navigation
            }
          }}
        >
          Proceed
        </Link>
      </Button>
    </div>
  );
};

export const SelectedAssetSectionSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 gap-y-6 sm:py-5">
      <div className="flex items-center justify-between">
        <p className="lg:text-3xl sm:text-2xl font-semibold text-white">
          Selected asset
        </p>
        <Button className="text-white cursor-pointer" disabled variant="ghost">
          Clear all
        </Button>
      </div>
      <div className="border h-full max-h-[800px] w-full rounded-lg border-gray-700 py-2 ">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-6 px-3 hover:bg-gray-800 rounded-lg "
          >
            <p className="text-white">
              <Skeleton className="w-50 h-4" />
            </p>
            <Button
              size="icon"
              variant="ghost"
              disabled
              className="hover:bg-transparent cursor-pointer"
            >
              <Skeleton className="size-5" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        asChild
        variant="secondary"
        disabled
        className="bg-gray-700 text-white hover:text-black "
      >
        <Link href={"/selectedasset"}>Proceed</Link>
      </Button>
    </div>
  );
};
