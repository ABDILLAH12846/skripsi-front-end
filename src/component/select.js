import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function MenuSelect({label, data, onChange}) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        {label ? <SelectValue placeholder={label} /> : null}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
            {
                data?.map((item) => (
                    <SelectItem value={item?.value}>{item?.title}</SelectItem>
                ))
            }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
