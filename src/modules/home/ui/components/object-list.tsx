import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ObjectTypeProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

const objectTypes = [
  { type: "All", label: "All objects", count: 27893 },
  { type: "PAYLOAD", label: "Payload", count: 13997 },
  { type: "ROCKET BODY", label: "Rocket body", count: 2167 },
  { type: "DEBRIS", label: "Debris", count: 10595 },
  { type: "UNKNOWN", label: "Unknown", count: 559 },
];

export const ObjectList = ({ value, onChange }: ObjectTypeProps) => {
  console.log(value);
  const onClick = (objectType: string) => {
    if (objectType === "All") {
      onChange([]);
      return;
    }
    if (value?.includes(objectType)) {
      onChange(value?.filter((t) => t !== objectType) || []);
    } else {
      onChange([...(value || []), objectType]);
    }
  };

  return (
    <>
      <div className="bg-gray-600  rounded-full p-1 hidden lg:flex flex-wrap gap-2 md:flex-nowrap w-full">
        {objectTypes.map(({ type, label, count }) => (
          <Button
            key={type}
            variant="ghost"
            onClick={() => onClick(type)}
            className={cn(
              "text-white hover:text-white text-sm md:text-base font-semibold border border-transparent hover: hover:bg-transparent rounded-full hover:border-blue-400 px-2 py-1 md:px-4 md:py-2 whitespace-nowrap",
              ((type === "All" && (!value || value.length === 0)) ||
                value?.includes(type)) &&
                "border-blue-400"
            )}
          >
            {label} ({count.toLocaleString()})
          </Button>
        ))}
      </div>
      <div className="bg-gray-100 rounded-md p-2 sm:flex lg:hidden flex-wrap gap-2 ">
        <p className="px-2 font-bold">Object types</p>
        {objectTypes.map(({ type, label, count }) => (
          <Button
            key={type}
            variant="secondary"
            onClick={() => onClick(type)}
            className={cn(
              "text-black text-sm md:text-base font-semibold hover:border hover:bg-transparent m-2 rounded-full hover:border-blue-400 px-1 py-1 md:px-4 md:py-2 whitespace-nowrap",
              ((type === "All" && (!value || value.length === 0)) ||
                value?.includes(type)) &&
                "border-blue-400"
            )}
          >
            {label} ({count.toLocaleString()})
          </Button>
        ))}
      </div>
    </>
  );
};

export const ObjectListSkeleton = () => {
  return (
    <div className="bg-gray-600  rounded-full p-1 hidden lg:flex flex-wrap gap-2 md:flex-nowrap w-full">
      {objectTypes.map(({ type, label, count }) => (
        <Button
          key={type}
          variant="ghost"
          disabled
          className="
            text-white hover:text-white text-sm md:text-base font-semibold hover:border hover:bg-transparent rounded-full hover:border-blue-400 px- py-1 md:px-4 md:py-2 whitespace-nowrap"
        >
          {label} ({count.toLocaleString()})
        </Button>
      ))}
    </div>
  );
};
