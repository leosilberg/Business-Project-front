import {
  ArrowRight,
  BriefcaseBusiness,
  LogIn,
  User,
  UserRoundCog,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { AvatarDemo } from "../ui/AvatarDemo";
import { Button } from "../ui/button";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
import { ModeToggle } from "../ui/mode-toggle";
import { MyDropDownMenu } from "../ui/myDropDownMenu";
// import { ModeToggle } from "../ui/ModeToggle";

export default function MainNavBar() {
  const location = useLocation();
  const pathArr = location.pathname.split("/");
  const isDetailsPage = pathArr.includes("businesses") && pathArr.length > 2;
  const navigate = useNavigate();

  const { logoutUser, loggedInUser } = useAuth();
  return (
    <>
      <nav className=" z-40 font-montserrat sticky top-0 mb-4 px-6 py-4 shadow-md bg-background dark:border-b dark:border-gray-200 break-950px:px-16">
        <ul className=" flex gap-2 justify-between items-center">
          <li className="flex gap-4 items-center">
            <Link className=" text-xl font-semibold text-primary" to="/">
              ReviewHub
            </Link>
            <Link to={"/businesses"} className="font-semibold text-primary">
              Businesses
            </Link>
          </li>
          <li className=" flex items-center gap-2">
            {isDetailsPage && (
              <ArrowRight
                className=" cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}
              />
            )}
            <div className="flex items-center">
              {loggedInUser ? (
                <MyDropDownMenu
                  triggerElement={
                    <Button size={"sm"} variant={"naked"}>
                      <AvatarDemo />
                    </Button>
                  }
                  dropDownItems={[
                    <DropdownMenuCheckboxItem className="">
                      <Link to="/user" className=" flex gap-2 items-center">
                        <span>Profile</span>
                        <User className="text-primary" size={16} />
                      </Link>
                    </DropdownMenuCheckboxItem>,
                    <DropdownMenuCheckboxItem className="">
                      <Link
                        to="/businesses"
                        className=" flex gap-2 items-center"
                      >
                        <span>businesses</span>{" "}
                        <BriefcaseBusiness className="text-primary" size={16} />
                      </Link>
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
