import { Star } from "lucide-react";
import { CustomSliderProps } from "../../Types/UI_Components.types";
import { Slider } from "./slider";

function CustomSlider(props: CustomSliderProps) {
  const { defaultValue, maxValue, steps } = props;

  return (
    <div className=" relative">
      <Slider
        className=" py-1 mb-1"
        onValueChange={(ev) => {
          console.log(ev[0]);
        }}
        defaultValue={[defaultValue]}
        min={1}
        max={maxValue}
        step={steps}
      />
      <div className=" absolute flex gap-1 left-1 text-sm items-center">
        <span>1</span>
        <Star color="yellow" size={14} />
      </div>
      <div className=" absolute flex gap-1 right-1 text-sm items-center">
        <span>5</span> <Star color="yellow" size={14} />
      </div>
    </div>
  );
}

export default CustomSlider;
