import {
  Facebook,
  Github,
  LocateIcon,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

function Footer() {
  const location = useLocation();

  return (
    <>
      <Separator className="mt-20" />
      <div className=" space-y-2 py-6 px-6 break-950px:px-16 bg-muted">
        <div className=" flex flex-col h-full min-h-32 justify-center gap-8">
          <h3 className=" text-center text-2xl font-bold text-primary">
            ReviewHub
          </h3>
          <div className=" flex flex-col gap-2 break-600px:flex-row break-600px:justify-center break-600px:gap-10 ">
            <div className="cursor-pointer flex gap-4">
              <Phone />
              <span>+972-012-3456</span>
            </div>
            <div className="cursor-pointer flex gap-4 ">
              <Mail />
              <span>demo@gmail.com</span>
            </div>
            <div className="cursor-pointer flex gap-4 ">
              <LocateIcon />
              <span>Israel, Ramat Gan</span>
            </div>
          </div>
        </div>
        <Separator className=" dark:bg-gray-700" />
        <div className=" flex flex-col px-4 gap-4 lg:flex-row lg:justify-between lg:items-center">
          <div className=" flex flex-col break-400px:flex-row gap-2 break-400px:justify-center">
            <Link
              className={`${
                location.pathname === "/" && "text-primary"
              } hover:underline`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`${
                location.pathname === "/about" && "text-primary"
              } hover:underline`}
              to="/about"
            >
              About
            </Link>
            <Link
              className={`${
                location.pathname.startsWith("/businesses") && "text-primary"
              } hover:underline`}
              to="/businesses"
            >
              Businesses
            </Link>
            <Link
              className={`${
                location.pathname === "/contact" && "text-primary"
              } hover:underline`}
              to="/"
            >
              Contact
            </Link>
            <Link
              className={`${
                location.pathname === "/terms" && "text-primary"
              } hover:underline`}
              to="/terms"
            >
              Terms of service
            </Link>
          </div>
          <div>
            <div className=" flex justify-center ">
              <Button variant={"link"}>
                <Facebook />
              </Button>
              <Button variant={"link"}>
                <Twitter />
              </Button>
              <Button variant={"link"}>
                <Github />
              </Button>
            </div>
          </div>
          <div>
            <h4 className=" text-sm text-center">
              @ This App created By Ariel Silberg and Eden Roth{" "}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
