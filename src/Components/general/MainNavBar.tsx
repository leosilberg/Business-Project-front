import { BriefcaseBusiness, LogIn, UserRoundCog } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { AvatarDemo } from "../ui/AvatarDemo";
import { MyDropDownMenu } from "../ui/myDropDownMenu";
import { useAuth } from "../../Context/AuthContext";
import { ModeToggle } from "../ui/mode-toggle";
// import { ModeToggle } from "../ui/ModeToggle";

export default function MainNavBar() {
  const { logoutUser, loggedInUser } = useAuth();
  return (
    <>
      <nav className=" z-40 font-montserrat sticky top-0 mb-4 px-6 py-4 shadow-md bg-background dark:border-b dark:border-gray-200">
        <ul className=" flex gap-2 justify-between items-center">
          <li>
            <Link className=" text-xl font-semibold text-primary" to="/">
              Brand
            </Link>
          </li>
          <li className=" flex items-center gap-2">
            <Link
              className=" text-md font-semibold text-primary flex gap-2 items-center"
              to="/businesses"
            >
              {" "}
              <BriefcaseBusiness size={16} />
            </Link>
            <div>
              {loggedInUser ? (
                <MyDropDownMenu
                  triggerElement={
                    <Button size={"sm"} variant={"naked"}>
                      <AvatarDemo />
                    </Button>
                  }
                  dropDownItems={[
                    <DropdownMenuCheckboxItem className="">
                      <Link to="/businesses">Optional</Link>
                    </DropdownMenuCheckboxItem>,
                    <DropdownMenuCheckboxItem className=" text-red-500 font-semibold hover:text-red-600 cursor-pointer hover:bg-slate-50">
                      <button
                        onClick={logoutUser}
                        className="flex items-center gap-1"
                      >
                        <span>Logout</span>
                        <span>
                          <LogIn size={16} />
                        </span>
                      </button>
                    </DropdownMenuCheckboxItem>,
                  ]}
                  label={`Hello ${loggedInUser.username}!`}
                />
              ) : (
                <Link to="/auth" className="flex gap-2 items-center">
                  <span>Sign In</span>
                  <span className=" bg-gray-300 p-1 rounded-full">
                    <UserRoundCog
                      size={16}
                      strokeWidth={1.25}
                      absoluteStrokeWidth
                    />{" "}
                  </span>
                </Link>
              )}
            </div>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </>
  );
}
