// components/orbit-code-filter.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrbitCodeFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

export const orbitCodes = [
  "LEO",
  "LEO1",
  "LEO2",
  "LEO3",
  "LEO4",
  "MEO",
  "GEO",
  "HEO",
  "IGO",
  "EGO",
  "NSO",
  "GTO",
  "GHO",
  "HAO",
  "MGO",
  "LMO",
  "UFO",
  "ESO",
  "UNKNOWN",
];

export const OrbitCodeFilter = ({ value, onChange }: OrbitCodeFilterProps) => {
  const onClick = (code: string) => {
    if (value?.includes(code)) {
      onChange(value.filter((c) => c !== code));
    } else {
      onChange([...(value || []), code]);
    }
  };

  return (
    <>
      <p className="px-2 font-bold">Object Codes</p>
      {/* Desktop view */}
      <div
        className=" hidden lg:flex flex-wrap gap-2 rounded-md p-2
      bg-gray-100 "
      >
        {orbitCodes.map((code) => (
          <Button
            key={code}
            variant="secondary"
            onClick={() => onClick(code)}
            className={cn(
              "text-black text-sm md:text-base font-semibold hover:border hover:bg-transparent m-2 rounded-full hover:border-blue-400 px-1 py-1 md:px-4 md:py-2 whitespace-nowrap",
              value?.includes(code) && "border border-blue-400"
            )}
          >
            {code}
          </Button>
        ))}
      </div>

      {/* Mobile view */}
      <div className="flex lg:hidden flex-wrap gap-2 p-2 bg-gray-100">
        {orbitCodes.map((code) => (
          <Button
            key={code}
            variant="secondary"
            onClick={() => onClick(code)}
            className={cn(
              "text-black text-sm font-medium rounded-full px-3 py-1",
              value?.includes(code) && "border border-blue-400"
            )}
          >
            {code}
          </Button>
        ))}
      </div>
    </>
  );
};
