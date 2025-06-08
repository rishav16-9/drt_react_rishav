import { useState } from "react";
import { useFilters } from "../../hooks/use-filter";
import { Attribute, AttributeSkeleton } from "../components/attribute";
import { ObjectList, ObjectListSkeleton } from "../components/object-list";
import {
  SatelliteDataSkeleton,
  SatteliteData,
} from "../components/sattelite-data";
import { Search, SearchSkeleton } from "../components/search";
import { Filter } from "../components/filter";
import { MobileFilterDrawer } from "../components/drawer";

export const MainSection = () => {
  const [filters, setFilters] = useFilters();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col w-full mx-auto gap-y-4">
      {/* Desktop Filters */}
      <div className="hidden lg:flex flex-col gap-4">
        <ObjectList
          value={filters.objectTypes}
          onChange={(value) => onChange("objectTypes", value)}
        />
        <div className="flex items-center justify-between gap-4">
          <Search
            value={filters.query}
            onQuery={(value) => onChange("query", value)}
          />
          <Attribute
            value={filters.attributes}
            onChange={(value) => onChange("attributes", value)}
          />
          <Filter onClick={() => setMobileFilterOpen(true)} />
        </div>
      </div>

      {/* Mobile Search + Filter */}
      <div className="flex lg:hidden justify-between items-center gap-4">
        <Search
          value={filters.query}
          onQuery={(value) => onChange("query", value)}
        />
        <Filter onClick={() => setMobileFilterOpen(true)} />
      </div>

      <MobileFilterDrawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onChange={onChange}
      />

      <SatteliteData />
    </div>
  );
};

export const MainSectionSkeleton = () => {
  return (
    <div className="flex flex-col w-full mx-auto gap-y-4">
      <ObjectListSkeleton />
      <div className="flex items-center justify-between gap-4">
        <SearchSkeleton />
        <AttributeSkeleton />
        <Filter />
      </div>
      <SatelliteDataSkeleton />
    </div>
  );
};
