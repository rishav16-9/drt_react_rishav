import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ObjectList } from "./object-list";
import { Attribute } from "./attribute";
import { OrbitCodeFilter } from "./object-code";
import { ScrollArea } from "@/components/ui/scroll-area";

type Filters = {
  objectTypes?: string[] | null;
  attributes?: string[] | null;
  orbitCodes?: string[] | null;
};
interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (key: keyof Filters, value: unknown) => void;
}

export const MobileFilterDrawer = ({
  open,
  onClose,
  filters,
  onChange,
}: MobileFilterDrawerProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-4 max-w-md w-full h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-auto">
          <div className="flex flex-col gap-y-4 p-2">
            {/* Mobile-only filters */}
            <div className="lg:hidden flex flex-col gap-y-4">
              <ObjectList
                value={filters.objectTypes}
                onChange={(value) => onChange("objectTypes", value)}
              />
              <Attribute
                value={filters.attributes}
                onChange={(value) => onChange("attributes", value)}
              />
            </div>

            {/* OrbitCodeFilter - shown in both mobile and web */}
            <OrbitCodeFilter
              value={filters.orbitCodes}
              onChange={(value) => onChange("orbitCodes", value)}
            />
          </div>
        </ScrollArea>

        <DialogClose asChild>
          <Button className="mt-4 w-full">Apply Filters</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
