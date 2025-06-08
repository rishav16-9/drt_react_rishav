"use client";
import { MainSection, MainSectionSkeleton } from "../sections/main-section";
import {
  SelectedAssetSection,
  SelectedAssetSectionSkeleton,
} from "../sections/selected-asset-section";

export const HomeView = () => {
  return (
    <div>
      <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
        <h1 className="text-3xl py-6 text-white font-bold">
          Create My Asset list
        </h1>
      </div>
      <div className="flex flex-col mx-auto pt-2.5 px-4 mb-10">
        <div className="flex gap-6">
          <div className="flex-1  min-w-0">
            <MainSection />
          </div>
          <div className="w-full hidden lg:flex xl:w-[380px] 2xl:w-[460px] shrink-1">
            <SelectedAssetSection />
          </div>
        </div>
        <div className="lg:hidden block mt-4">
          <SelectedAssetSection />
        </div>
      </div>
    </div>
  );
};

export const HomeViewSkeleton = () => {
  return (
    <div>
      <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12">
        <h1 className="text-3xl py-6 text-white font-bold">
          Create My Asset list
        </h1>
      </div>
      <div className="flex flex-col mx-auto pt-2.5 px-4 mb-10">
        <div className="flex gap-6">
          <div className="flex-1  min-w-0">
            <MainSectionSkeleton />
          </div>
          <div className="w-full hidden lg:flex xl:w-[380px] 2xl:w-[460px] shrink-1">
            <SelectedAssetSectionSkeleton />
          </div>
        </div>
        <div className="lg:hidden block mt-4">
          <SelectedAssetSectionSkeleton />
        </div>
      </div>
    </div>
  );
};
