"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import { cn } from "@/lib/utils";

const Page = () => {
  const data = useAppSelector((state) => state.satelliteData.data);
  return (
    <div className="max-w-(--breakpoint-xl) mx-auto p-4 lg:px-12">
      <div className="flex flex-col flex-1 gap-y-6">
        <p className="text-4xl font-bold text-white py-6">Selected asset</p>
        <div className="border h-full max-h-[500px] w-full rounded-lg border-gray-700">
          {data.map((ele, index) => (
            <div
              key={ele.noradCatId}
              className={cn(
                "flex items-center justify-between gap-6 px-3 p-4 hover:bg-gray-800",
                index !== data.length - 1 && "border-b border-gray-800"
              )}
            >
              <p className="text-white">
                {ele.noradCatId}&nbsp;-&nbsp;{ele.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
