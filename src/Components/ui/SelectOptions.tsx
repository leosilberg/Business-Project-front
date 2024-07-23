import { SelectOptionsProps } from "../../Types/UI_Components.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

export function SelectOptions(props: SelectOptionsProps) {
  const {
    selectTitle,
    selectValuePlaceholder,
    children,
    selectName,
    curValue,
    className,
    onValueChange,
  } = props;
  return (
    <Select
      onValueChange={onValueChange}
      name={selectName}
      defaultValue={curValue}
    >
      <SelectTrigger className={`min-w-40 ${className}`}>
        <SelectValue placeholder={selectValuePlaceholder || ""} />
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

export function DisableSelectOptions(props: {
  selectValuePlaceholder: string;
}) {
  const { selectValuePlaceholder } = props;
  return (
    <Select>
      <SelectTrigger className="min-w-40 ">
        <SelectValue placeholder={selectValuePlaceholder} />
      </SelectTrigger>
    </Select>
  );
}
