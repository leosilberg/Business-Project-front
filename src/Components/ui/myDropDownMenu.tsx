import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface MyDropDownMenuProps {
  triggerElement: any;
  dropDownItems: any[]; // DropdownMenuCheckboxItem
  label: string;
}

export function MyDropDownMenu({
  triggerElement,
  dropDownItems,
  label,
}: MyDropDownMenuProps) {
  //   const [showStatusBar, setShowStatusBar] = useState(true);
  //   const [showActivityBar, setShowActivityBar] = useState(false);
  //   const [showPanel, setShowPanel] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerElement}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-36 max-w-56 font-montserrat">
        <DropdownMenuLabel className="text-center">{label}</DropdownMenuLabel>
        {!dropDownItems
          ? ""
          : dropDownItems.map((item, index) => {
              return (
                <div key={index}>
                  <DropdownMenuSeparator />
                  {item}
                </div>
              );
            })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
