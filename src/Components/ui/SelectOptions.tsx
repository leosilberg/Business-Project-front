import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { SelectOptionsProps } from "../../Types/UI_Components.types";

export function SelectOptions(props: SelectOptionsProps) {
  const { selectTitle, selectValuePlaceholder, children } = props;
  return (
    <Select>
      <SelectTrigger className="min-w-40 ">
        <SelectValue placeholder={selectValuePlaceholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectTitle}</SelectLabel>
          {children}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
