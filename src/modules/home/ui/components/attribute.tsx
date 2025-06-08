import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AttributeProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

const attributeOptions = [
  { key: "orbitCode", label: "Orbit Code" },
  { key: "objectType", label: "Object Type" },
  { key: "countryCode", label: "Country Code" },
  { key: "launchDate", label: "Launch Date" },
];

export const Attribute = ({ onChange, value }: AttributeProps) => {
  const onClick = (attribute: string) => {
    if (attribute === "All") {
      onChange([]);
      return;
    }
    if (value?.includes(attribute)) {
      onChange(value.filter((t) => t !== attribute));
    } else {
      onChange([...(value || []), attribute]);
    }
  };

  return (
    <>
      <div className="bg-gray-600 lg:flex hidden flex-row items-center rounded-full justify-center gap-2">
        {attributeOptions.map(({ key, label }) => (
          <Button
            key={key}
            variant="ghost"
            onClick={() => onClick(key)}
            className={cn(
              "text-white hover:text-white text-lg font-semibold border border-transparent hover:bg-transparent rounded-full hover:border-blue-400",
              value?.includes(key) && "border-blue-400"
            )}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="bg-gray-100 rounded-md p-2 sm:flex lg:hidden flex-wrap gap-2 ">
        <p className="px-2 font-bold">Object list</p>
        {attributeOptions.map(({ key, label }) => (
          <Button
            key={key}
            variant="secondary"
            onClick={() => onClick(key)}
            className={cn(
              "text-black text-sm md:text-base font-semibold hover:border hover:bg-transparent m-2 rounded-full hover:border-blue-400 px-1 py-1 md:px-4 md:py-2 whitespace-nowrap",

              value?.includes(key) && "border-blue-400"
            )}
          >
            {label}
          </Button>
        ))}
      </div>
    </>
  );
};

export const AttributeSkeleton = () => {
  return (
    <div className="bg-gray-600 lg:flex hidden flex-row items-center rounded-full justify-center">
      <Button
        variant="ghost"
        disabled
        className="text-white hover:text-white text-lg hover:border hover:bg-transparent rounded-full hover:border-blue-400"
      >
        Orbit code
      </Button>
      <Button
        variant="ghost"
        disabled
        className="text-white hover:text-white text-lg font-semibold hover:border hover:bg-transparent rounded-full hover:border-blue-400"
      >
        Object Type
      </Button>
      <Button
        variant="ghost"
        disabled
        className="text-white hover:text-white text-lg font-semibold hover:border hover:bg-transparent rounded-full hover:border-blue-400"
      >
        Country code
      </Button>
      <Button
        variant="ghost"
        disabled
        className="text-white hover:text-white text-lg font-semibold hover:border hover:bg-transparent rounded-full hover:border-blue-400"
      >
        LaunchDate
      </Button>
    </div>
  );
};
