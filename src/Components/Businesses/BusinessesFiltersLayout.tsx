import { MapPinned, Search } from "lucide-react";
import { IconInput } from "../ui/input";
import { DisableSelectOptions, SelectOptions } from "../ui/SelectOptions";
import { SelectItem } from "../ui/select";
import CustomSlider from "../ui/CustomSlider";
import { Badge } from "../ui/badge";
import { constBusinessCategories } from "../../constants";
import { SetURLSearchParams } from "react-router-dom";
import { BussinessI } from "../../Types/Businesses.types";
import { Button } from "../ui/button";

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
  // Derived States - search params
  const nameSearch = searchParams.get("name") || "";
  const citySearch = searchParams.get("city") || "";
  const districtSearch = searchParams.get("district") || "";
  const minRatingSearch = searchParams.get("minRating") || "1";

  const categoriesSearch = searchParams.get("category");
  const categoriesSearchArr = categoriesSearch
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
        newCategoriesArr.length > 0
          ? prev.set("category", newCategoriesArr.join(","))
          : prev.delete("category");
        return prev;
      });
    } else {
      const value = ev.target.value;
      setSearchParams((prev) => {
        prev.set("page", "1");
        !value ? prev.delete(inputName) : prev.set(inputName, value);
        inputName === "city" && value && prev.delete("district");
        return prev;
      });
    }
  }

  // SELECT SHADCN
  function handleSelectFilter(value: string) {
    setSearchParams((prev) => {
      prev.set("page", "1");
      !citySearch && prev.set("district", value);
      return prev;
    });
  }

  function handleSliderFilter(value: number[]) {
    setSearchParams((prev) => {
      prev.set("page", "1");
      value[0] === 1
        ? prev.delete("minRating")
        : prev.set("minRating", value[0].toString());
      return prev;
    });
  }

  function resetFilters() {
    setSearchParams((prev) => {
      prev.delete("name");
      prev.delete("district");
      prev.delete("city");
      prev.delete("minRating");
      prev.delete("category");
      prev.delete("page");
      return prev;
    });
  }

  return (
    <>
      <div className=" flex flex-col gap-2 flex-wrap max-w-600 mx-auto">
        <IconInput
          value={nameSearch}
          onChange={handledInputFilter}
          name="name"
          type="text"
          placeholder="Search a bussiness ..."
          Icon={Search}
        />
        <ul className=" flex gap-2 flex-wrap px-4">
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
          {!citySearch ? (
            <SelectOptions
              curValue={districtSearch || ""}
              onValueChange={handleSelectFilter}
              selectName="district"
              selectValuePlaceholder="Filter by district"
              selectTitle="District"
            >
              <SelectItem value="North">North</SelectItem>
              <SelectItem value="Central District">Center</SelectItem>
              <SelectItem value="South">South</SelectItem>
            </SelectOptions>
          ) : (
            <DisableSelectOptions selectValuePlaceholder="Filter by district" />
          )}

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
        <Button onClick={resetFilters} className=" max-w-36 mx-auto">
          Reset Filters
        </Button>
      </div>
    </>
  );
}

export default BusinessesFiltersLayout;
