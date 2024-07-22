import { MapPinned, Search } from "lucide-react";
import { IconInput } from "../ui/input";
import { SelectOptions } from "../ui/SelectOptions";
import { SelectItem } from "../ui/select";
import CustomSlider from "../ui/CustomSlider";
import { Badge } from "../ui/badge";
import { constBusinessCategories } from "../../constants";
import { SetURLSearchParams } from "react-router-dom";
import { BussinessI } from "../../Types/Businesses.types";

export interface BusinessesFiltersLayoutProps {
  setBusinessesList: React.Dispatch<React.SetStateAction<[] | BussinessI[]>>;
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}

function BusinessesFiltersLayout({
  // setBusinessesList,
  setSearchParams,
  searchParams,
}: BusinessesFiltersLayoutProps) {
  const nameSearch = searchParams.get("name");
  // const districtSearch = searchParams.get("district");
  const citySearch = searchParams.get("city") || "";
  const minRatingSearch = searchParams.get("minRating") || "1";
  const categoriesSearch = searchParams.get("category");
  const categoriesSearchArr = categoriesSearch // important!
    ? categoriesSearch.split(",")
    : [];

  // INPUT AND CHECKBOXES
  function handledInputFilter(ev: React.ChangeEvent<HTMLInputElement>) {
    const inputName = ev.target.name;
    if (ev.target.type === "checkbox") {
      const checked = ev.target.checked;
      const newCategoriesArr = checked
        ? [...categoriesSearchArr, inputName]
        : categoriesSearchArr.filter((category) => category !== inputName);
      setSearchParams((prev) => {
        prev.set("page", "1");
        prev.set("category", newCategoriesArr.join(","));
        return prev;
      });
    } else {
      const value = ev.target.value;
      setSearchParams((prev) => {
        prev.set("page", "1");
        prev.set(inputName, value);
        return prev;
      });
    }
  }

  // SELECT SHADCN
  function handleSelectFilter(value: string) {
    setSearchParams((prev) => {
      prev.set("page", "1");
      prev.set("district", value);
      return prev;
    });
  }

  function handleSliderFilter(value: number[]) {
    setSearchParams((prev) => {
      prev.set("page", "1");
      prev.set("minRating", value[0].toString());
      return prev;
    });
  }

  function resetFilters() {
    setSearchParams((prev) => {
      prev.set("name", "");
      prev.set("district", "");
      prev.set("city", "");
      prev.set("minRating", "1");
      prev.set("category", "");
      return prev;
    });
  }

  return (
    <>
      <div className=" flex flex-col gap-2 flex-wrap max-w-600 mx-auto">
        <IconInput
          value={nameSearch || ""}
          onChange={handledInputFilter}
          name="name"
          type="text"
          placeholder="Search a bussiness ..."
          Icon={Search}
        />

        <ul className=" flex gap-2 flex-wrap">
          {constBusinessCategories.map((category, index) => {
            const isCheckedCategory = categoriesSearchArr.includes(category);
            return (
              <li key={index}>
                <label htmlFor={category + "_id"}>
                  <Badge
                    className=" cursor-pointer"
                    variant={!isCheckedCategory ? "inverse" : "default"}
                  >
                    {category}
                  </Badge>
                </label>
                <input
                  name={category}
                  id={category + "_id"}
                  onChange={handledInputFilter}
                  type="checkbox"
                  className=" hidden"
                />
              </li>
            );
          })}
        </ul>
        {/* Location */}
        <div className=" grid break-400px:grid-cols-2 gap-2 px-2">
          <SelectOptions
            onValueChange={handleSelectFilter}
            selectName="district"
            selectValuePlaceholder="Filter by district"
            selectTitle="District"
          >
            <SelectItem value="north">North</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="south">South</SelectItem>
          </SelectOptions>
          <IconInput
            value={citySearch}
            onChange={handledInputFilter}
            name="city"
            className="min-w-0"
            Icon={MapPinned}
            placeholder="Find by city"
          />
        </div>
        {/* Others */}
        <div className=" space-y-2 p-1 min-h-20">
          <h4 className=" text-sm">Minimum Rating :</h4>
          <CustomSlider
            onValueChange={handleSliderFilter}
            defaultValue={minRatingSearch}
            maxValue={5}
            steps={0.5}
          />
        </div>
      </div>
    </>
  );
}

export default BusinessesFiltersLayout;
