import { MapPinned, Search } from "lucide-react";
import { IconInput, Input } from "../ui/input";
import { SelectOptions } from "../ui/SelectOptions";
import { SelectItem } from "../ui/select";
import CustomSlider from "../ui/CustomSlider";

function BusinessesFiltersLayout() {
  return (
    <>
      <div className=" flex flex-col gap-2 max-w-600 mx-auto">
        <IconInput
          type="text"
          placeholder="Search a bussiness ..."
          Icon={Search}
        />
        {/* Location */}
        <div className=" grid break-400px:grid-cols-2 gap-2">
          <SelectOptions
            selectValuePlaceholder="Filter by district"
            selectTitle="District"
          >
            <SelectItem value="north">North</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="south">South</SelectItem>
          </SelectOptions>
          <IconInput Icon={MapPinned} placeholder="Find by city" />
        </div>
        {/* Others */}
        <div className=" space-y-2 p-1">
          <h4 className=" text-sm">Minimum Rating :</h4>
          <CustomSlider defaultValue={1} maxValue={5} steps={0.5} />
        </div>
      </div>
    </>
  );
}

export default BusinessesFiltersLayout;
