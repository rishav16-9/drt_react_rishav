import { useFilters } from "../../hooks/use-filter";
import { ObjectList } from "../components/object-list";

export const MainSection = () => {
  const [filters, setFilters] = useFilters();

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };
  return (
    <div className="flex flex-col w-full mx-auto">
      <ObjectList
        value={filters.objectTypes}
        onChange={(value) => onChange("objectTypes", value)}
      />
    </div>
  );
};
