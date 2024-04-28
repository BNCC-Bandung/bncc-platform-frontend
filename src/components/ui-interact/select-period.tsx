import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectPeriod() {
  const periods = [
    "Period 33",
    "Period 34",
    "Period 35",
    "Period 36",
    "Period 37",
  ];

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a period" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {periods.map((period) => (
            <SelectItem key={period} value={period}>
              {period}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
