import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface SearchProps {
  value: string | null;
  onQuery: (value: string) => void;
}
export const Search = ({ value, onQuery }: SearchProps) => {
  const [inputValue, setInputValue] = useState(value || "");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onQuery(inputValue);
  };

  return (
    <form onSubmit={handleSearch} className="flex max-w-[450px] w-full">
      <div className="relative w-full max-w-[450px] flex items-center">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className=" border border-white rounded-full p-2 px-5 w-full text-white placeholder:text-white/70"
          placeholder="Search name and noradcatid"
        />
        {inputValue && (
          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => {
              setInputValue("");
              onQuery("");
            }}
            className="absolute text-white right-3 cursor-pinter"
          >
            <XIcon />
          </Button>
        )}
      </div>
    </form>
  );
};

export const SearchSkeleton = () => {
  return (
    <div className="relative w-full max-w-[450px] flex items-center">
      <input
        disabled
        className=" border border-white rounded-full p-2 px-5 w-full text-white placeholder:text-white/70"
        placeholder="Search name and noradcatid"
      />
    </div>
  );
};
