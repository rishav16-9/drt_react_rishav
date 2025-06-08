import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

export const Filter = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      onClick={onClick}
      className="cursor-pointer bg-transparent "
      size="icon"
      variant="secondary"
    >
      <FilterIcon className="w-5 h-5 text-white hover:text-black" />
    </Button>
  );
};
