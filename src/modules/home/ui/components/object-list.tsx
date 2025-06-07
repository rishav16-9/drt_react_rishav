import { Button } from "@/components/ui/button";

interface ObjectTypeProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}
export const ObjectList = ({ value, onChange }: ObjectTypeProps) => {
  const onClick = (objectType: string) => {
    if (value?.includes(objectType)) {
      onChange(value?.filter((t) => t !== objectType) || []);
    } else {
      onChange([...(value || []), objectType]);
    }
  };
  return (
    <div className="bg-gray-600 flex flex-row items-center rounded-full justify-center">
      <Button
        variant="ghost"
        onClick={() => onClick("")}
        className="text-white hover:text-white text-lg font-semibold hover:border hover:bg-transparent rounded-full hover:border-blue-400"
      >
        All objects (27893)
      </Button>
      <Button
        variant="ghost"
        onClick={() => onClick("PAYLOAD")}
        className="text-white hover:text-white text-lg hover:border hover:bg-transparent rounded-full hover:border-blue-400"
      >
        Palyload (13997)
      </Button>
      <Button
        variant="ghost"
        onClick={() => onClick("ROCKET BODY")}
        className="text-white hover:text-white text-lg font-semibold hover:border hover:bg-transparent rounded-full hover:border-blue-400"
      >
        Rocket body (2167)
      </Button>
      <Button
        variant="ghost"
        onClick={() => onClick("DEBRIS")}
        className="text-white hover:text-white text-lg font-semibold hover:border hover:bg-transparent rounded-full hover:border-blue-400"
      >
        Debris (10595)
      </Button>
      <Button
        variant="ghost"
        onClick={() => onClick("UNKNOWN")}
        className="text-white hover:text-white text-lg font-semibold hover:border hover:bg-transparent rounded-full hover:border-blue-400"
      >
        Unknown (559)
      </Button>
    </div>
  );
};
